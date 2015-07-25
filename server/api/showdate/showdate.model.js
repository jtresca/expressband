'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShowdateSchema = new Schema({
  venue: String,
  street: String,
  town: String,
  state: { type: String, default: "NY" },
  zip: Number,
  date: Date,
  startTime: String,
  endTime: String,
  phone: String,
  notes: String
});

module.exports = mongoose.model('Showdate', ShowdateSchema);