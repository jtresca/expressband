'use strict';

var _ = require('lodash');
var nodemailer = require("nodemailer");

function handleError(res, err) {
  return res.send(500, err);
}

exports.nodemailer = function(req, res) {
  console.log("I got here!", req.body.recipients);
  var nodemailer = require('nodemailer');

  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'mikedana.tresca88@gmail.com',
          pass: 'sciencewonders'
      }
  });

  // NB! No need to recreate the transporter object. You can use
  // the same transporter object for all e-mails
  _.each(req.body.recipients, function(recipient) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Express Band mikedana.tresca88@gmail.com', // sender address
      to: recipient, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plaintext body
      html: '<b>'+req.body.message +'</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      else {
        return res.send(201, {messageRecieved: true}); 
      }
  });
});

};




