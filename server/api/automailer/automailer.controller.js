'use strict';

var _ = require('lodash');
var nodemailer = require("nodemailer");

function handleError(res, err) {
  return res.send(500, err);
}

exports.automail = function() {

  console.log("AUTOMAIL EXECUTED");
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
      to: 'calactyte@gmail.com',//req.body.recipients, // list of receivers
      subject: 'Upcoming Express Band Show Notification',//req.body.subject, // Subject line
      text: 'AUTOMAIL BODY',// req.body.message, // plaintext body
      html: 'AUTOMAIL BODY'//'<b>'+req.body.message +'</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
};




