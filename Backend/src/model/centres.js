const mongoose = require("mongoose");
//accessing mongoose package

const Schema = mongoose.Schema;
//create schema for books//single book create single document

const CentreSchema = new Schema({
    district: String,
    centre: String
});

var CentreData = mongoose.model("centre", CentreSchema);//Convert schema into  model to use schema//embed schema inside a model
//bookdata=>bookdatas in db
module.exports = CentreData;
