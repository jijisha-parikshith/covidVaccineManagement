const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const RegistrationData = require('./src/model/Registrationdata');
const CentreData = require('./src/model/centres');
const LoginData = require('./src/model/login');
const app = new express();
const cors = require("cors");
var bodyparser = require("body-parser");
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));//with help of middleware to use post method 
const port = 3000;
var username = "admin";
var password = "admin123";

//db connection
mongoose.connect("mongodb+srv://jiji_2021:jiji_2021@jijisfiles.od7cs.mongodb.net/vaccine?retryWrites=true&w=majority", {
   useNewUrlParser: true, useUnifiedTopology: true
}, function (err) {
   if (err) console.log(err);
   else {
      console.log('connected');
   }
});

const nodemailer = require('nodemailer');
const config = {
   mail: 'shiljith07@gmail.com',
   password: '123'
};

//mail function////
const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   auth: {
       user: 'covidvaccineproject@gmail.com',
       pass: 'byngpynjtmdjaieb'
   },
   tls: {
       rejectUnauthorized: false
   }
});
//mail function////

//token verification
function verifyToken(req,res,next){
   console.log(req.headers.authorization);
   if(!req.headers.authorization){
      return res.status(401).send("Unauthorized Request");
   }
   let token =  req.headers.authorization.split(' ')[1];//index 0 will be bearer ,index 1 will be the token
    if(token=="null"){
      return res.status(401).send("Unauthorized request");
   }
   let payload = jwt.verify(token,"secretkey");
   console.log(payload);
   if(!payload){
      return res.status(401).send("Unauthorized request");
   }
   req.userId = payload.subject;
   next()
}
//token verification

app.post("/insert", function (req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
   console.log(chalk(req.body));
   let data = {...req.body, vaccinationCentre: null, vaccinationDate: null, status: 'registered' };
   var userregister = new RegistrationData(data);
   userregister.save().then(data => {
      console.log('Save response', data);
      res.send(data);
   }).catch(err => {
      console.log(err)
   });
});
//add centre
app.post("/addcentre",function(req,res){
console.log("this data",chalk(req.body));
var addcentre = new CentreData (req.body);
addcentre.save().then(data=>{
console.log("saved centre",data);
res.send(data);
}).catch(err=>{
console.log(err);
});

});
//add centre
app.put("/editUser/:id",verifyToken, function (req, res) {
   req.body.status = 'beneficiary';
   RegistrationData.updateOne({_id: req.params.id}, req.body).then(data => {
      
      // Mail
      var sub="Covid Vaccination Details";
      var vaccineDate = req.body.vaccinationDate;
      var newDate = vaccineDate.split("-").reverse().join("-");
      console.log('Sending...', req.body.email)
      var mailOptions = {
         from: config.mail,
         to: req.body.email,
         subject: sub,
         html: `Hi ${req.body.name},<p>Your covid vaccine registration process has been completed succesfully!!<br>Report at ${req.body.vaccinationCentre} on ${newDate} to get your vaccine</p>.<p>Thank You<br>Covid Vaccine Management Team</p>`
         };

         transporter.sendMail(mailOptions, function(error, info){
         if (error) {
            console.log(error);
         } else {
            console.log('Email sent: ' + info.response);
            console.log(req.body.vaccinationCentre);
            res.send(data);
         }
      });
   }).catch(err => {
      console.log(err)
   });
});
//mail
app.put("/makeVaccinated", verifyToken, function (req, res) {
   console.log(req.body)
   req.body.status = 'beneficiary';
   RegistrationData.updateOne({_id: req.body.id}, {status: 'vaccinated'}).then(data => {
      console.log('Updated Success', data);
      res.send(data);
   }).catch(err => {
      console.log(err)
   });
});

app.get("/registers",verifyToken, function (req, res) {
   let field = {status: req.query.status};
   if(req.query.userType && req.params.userType !== '') {
      field = { ...field, userType: req.query.userType };
   }
   RegistrationData.find(field).then(function (data) {
      console.log('data', data)
      res.send(data);
   });
});

app.get("/getUser/:id",verifyToken, function (req, res) {
   
   if(req.params.id && req.params.id !== ' ') {
      RegistrationData.findById({_id: req.params.id}).then(function (data) {
         console.log('data', data)
         res.send(data);
      });
   }
   
});

app.get("/getCentres/:district", verifyToken, function (req, res) {
   
   if(req.params.district && req.params.district !== ' ') {
      CentreData.find({district: req.params.district}).then(function (data) {
         console.log('data', data)
         res.send(data);
      });
   }
   
});

app.delete("/remove/:id",verifyToken, function (req, res) {
   id = req.params.id
   RegistrationData.findByIdAndDelete({ "_id": id }).then(() => {
      console.log("deleted successfully!!");
      res.send();
   })
});
app.post("/login",function(req,res){
   const Userdata = req.body;
   console.log(Userdata)
   if(Userdata && Userdata.uname && Userdata.password) {
      LoginData.find({username: Userdata.uname, password: Userdata.password}).then(function (data) {
         console.log('data', data)
         if(data.length === 1) {
            let payload = {subject: data.username + data.password};//header,payload,token
            let token = jwt.sign(payload, "secretkey");//secretkey string to generate the token at serverside
            res.status(200).send({token});//send the token back to client side
         }else{
            res.status(401).send('Invalid username or password');
         }
      });
   }
   // if(!username){
   //    res.status(401).send("Invalid Username");
   // }else if(password != Userdata.password){
   //    res.status(401).send("Invalid Password");
   // }else{
   //    let payload = {subject:username + password};//header,payload,token
   //    let token = jwt.sign(payload,"secretkey");//secretkey string to generate the token at serverside
   //     res.status(200).send({token});//send the token back to client side
   // }
});

app.listen(3000, () => { console.log(chalk.blue("server ready at port:" + port)); });//start server