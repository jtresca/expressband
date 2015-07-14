'use strict';

var _ = require('lodash');
var nodemailer = require("nodemailer");

function handleError(res, err) {
  return res.send(500, err);
}

exports.nodemailer = function(req, res, next) {
  console.log("I got here!");
  var nodemailer = require('nodemailer');

  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'calactyte@gmail.com',
          pass: 'newbaby2012'
      }
  });

  // NB! No need to recreate the transporter object. You can use
  // the same transporter object for all e-mails

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Joe Tresca calactyte@gmail.com', // sender address
      // to: req.body.address, // list of receivers
      bcc: ['calactyte@gmail.com','calactyte@mailcity.com'],
      subject: req.body.subject, // Subject line
      text: req.body.message, // plaintext body
      html: '<b>'+req.body.message +'</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      next();

  });

};




