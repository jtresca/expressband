'use strict';

var _ = require('lodash');
var nodemailer = require("nodemailer");
var Showdate = require('../showdate/showdate.model');
var Mailinglist = require('../mailinglist/mailinglist.model');
var moment = require("moment");
var showdates;
var mailinthelist;

setTimeout(function(){
  console.log("SERVER DATE IS: ",moment().format('llll'));
 
 //DATABASE CALL
 Showdate.find(function (err, showdate) {
    return showdates = showdate;
  });

 Mailinglist.find(function (err, maillist) {
    // return mailinthelist = _.map(maillist, 'email');
    return mailinthelist = maillist;
  });
 //DATABASE CALL
exports.automail();
},3000)


function handleError(res, err) {
  return res.send(500, err);
}

exports.automail = function() {
     // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'calactyte@gmail.com',
          pass: 'newbaby2012'
      }
  });

   //DATABASE CALL
 Showdate.find(function (err, showdate) {
    return showdates = showdate;
  });

 Mailinglist.find(function (err, maillist) {
    // return mailinthelist = _.map(maillist, 'email');
    return mailinthelist = maillist;
  });
 //DATABASE CALL

//GARBAGE COLLECTION DELETES PAST SHOWS FROM THE DB
console.log("GARBAGE COLLECTION BEGIN", showdates);
 _.each(showdates,function(dateofshow){
            
             if (moment() > moment(dateofshow.date) ) {
              console.log(dateofshow);
              console.log("This right here is a list of all the show dates:", dateofshow.date);
              console.log(dateofshow._id, ":this is the ID");

              Showdate.remove({ _id: dateofshow._id }, function(err) {
                  if (!err) {
                      console.log("Success!");
                   }
                   else {
                       console.log("Failure!");
                  }
              });
             };

  });
 

 
    //loop through DB return to get all showdates then send an email to each recipient on mailinglist if show is 5 days from today.
  _.each(showdates, function(date) {
     var today = moment().format("MM DD YY");
     var fiveDaysBefore = moment(date.date).subtract(5,'days').format("MM DD YY"); 
      if (today == fiveDaysBefore) {
            console.log("FIVE DAYS BEFORE IS:", fiveDaysBefore, "THE ACTUAL SHOWDATE IS", date.date); 
            _.each(mailinthelist, function(recipient){
              console.log("I SENT AN EMAIL TO", recipient.email );
              var phonenum = date.phone;
             var areacode = phonenum.slice(0,3);
             var prefixnum = phonenum.slice(3,6);
             console.log(prefixnum,"THIS IS THE AREA CODE");
             var suffixnum = phonenum.slice(6);

               // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: 'Express Band calactyte@gmail.com', // sender address
                    to: recipient.email, // list of receivers
                    subject: 'Upcoming Express Band Show Notification',//req.body.subject, // Subject line
                    // text: 'AUTOMAIL BODY',// req.body.message, // plaintext body
                    html: 'Hi '+ recipient.name +','+'<br>'+'<br>'+
                    'We wanted to remind you that Express Band\'s<br>next live show is this '+ '<b>'+moment(date.date).format(' dddd MMMM Do')+', '+moment(date.date).format('YYYY')+'.'+'</b>'+'<br>'+
                    'We\'ll be playing at ' + '<b>'+date.venue+'</b>'+'<br>'+ 'between the hours of '+'<b>'+date.startTime+'</b>'+' and '+'<b>'+date.endTime+'</b>'+'.'+'<br>'+'<br>'+
                    'You can call '+'('+areacode+')'+' '+prefixnum + '-'+suffixnum+' for more information.'+'<br>'+
                    'As always, we really appreciate the support of our family, friends and fans.'+'<br><br><br>'+
                    'Sincerely,'+'<br><br>'+
                    'Express Band'
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
                //send mail with defined transport END
            })   
      }
      else {
         console.log("NOTHING");
      }
  })

 

 
};




