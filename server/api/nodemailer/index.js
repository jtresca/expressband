'use strict';

var express = require('express');
var controller = require('./nodemailer.controller');

var router = express.Router();


router.post('/', controller.nodemailer);


module.exports = router;