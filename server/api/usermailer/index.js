'use strict';

var express = require('express');
var controller = require('./usermailer.controller');

var router = express.Router();


router.post('/', controller.usermailer);
router.get('/', controller.usermailer);


module.exports = router;