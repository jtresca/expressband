'use strict';

var _ = require('lodash');
var nodemailer = require("nodemailer");

function handleError(res, err) {
  return res.send(500, err);
}

exports.usermailer = function(req, res, next) {
  console.log("I got here! I'm the usermailer");
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
      from: req.body.name + req.body.address, // sender address
      to: 'Joe Tresca calactyte@gmail.com', // list of receivers
      // bcc: ['calactyte@gmail.com','calactyte@mailcity.com'],
      subject: req.body.subject, // Subject line
      html: "reply-email: " + req.body.address+"<br><br>"+req.body.message // HTMLbody
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return res.json(error);
      }
      console.log('Message sent: ' + info.response);
      next();

  });

};




