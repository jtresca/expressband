'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MailinglistSchema = new Schema({
  name: { type: String, default: "Express Band Fan" }, 
  email: String,
});

module.exports = mongoose.model('Mailinglist', MailinglistSchema);