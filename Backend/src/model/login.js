const mongoose = require("mongoose");
//accessing mongoose package

const Schema = mongoose.Schema;
//create schema for books//single book create single document

const LoginSchema = new Schema({
    username: String,
    password: String
});

var LoginData = mongoose.model("login", LoginSchema);//Convert schema into  model to use schema//embed schema inside a model
//bookdata=>bookdatas in db
module.exports = LoginData;
