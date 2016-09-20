'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImgSchema = new Schema({
   qname: String,
   queryEmail: { type: String, lowercase: true },
   query:String,
});

module.exports = mongoose.model('Img', ImgSchema);
