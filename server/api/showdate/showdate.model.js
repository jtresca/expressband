'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShowdateSchema = new Schema({
  venue: String,
  address: String,
  date: Date,
  time: String,
  phone: String,
  notes: String
});

module.exports = mongoose.model('Showdate', ShowdateSchema);