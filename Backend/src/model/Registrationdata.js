const mongoose = require("mongoose");
//accessing mongoose package

const Schema = mongoose.Schema;
//create schema for books//single book create single document

const RegistrationSchema = new Schema({
    name: String,
    email: String,
    mobile: String,
    gender: String,
    aadhar: String,
    dob: String,
    userType: String,
    address: String,
    health: String,
    district: String,
    vaccinationDate: String,
    vaccinationCentre: String,
    status: String
});

var Registrationdata = mongoose.model("registrationdata", RegistrationSchema);//Convert schema into  model to use schema//embed schema inside a model
//bookdata=>bookdatas in db
module.exports = Registrationdata;
