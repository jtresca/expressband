'use strict';

var express = require('express');
var controller = require('./automailer.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();


router.get('/', controller.automail);


module.exports = router;