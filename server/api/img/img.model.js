'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImgSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Img', ImgSchema);
