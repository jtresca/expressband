'use strict';

var _ = require('lodash');
var Showdate = require('./showdate.model');

// Get list of showdates
exports.index = function(req, res) {
  Showdate.find(function (err, showdates) {
    if(err) { return handleError(res, err); }
    return res.json(200, showdates);
  });
};

// Get a single showdate
exports.show = function(req, res) {
  Showdate.findById(req.params.id, function (err, showdate) {
    if(err) { return handleError(res, err); }
    if(!showdate) { return res.send(404); }
    return res.json(showdate);
  });
};

// Creates a new showdate in the DB.
exports.create = function(req, res) {
  Showdate.create(req.body, function(err, showdate) {
    if(err) { return handleError(res, err); }
    return res.json(201, showdate);
  });
};

// Updates an existing showdate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Showdate.findById(req.params.id, function (err, showdate) {
    if (err) { return handleError(res, err); }
    if(!showdate) { return res.send(404); }
    var updated = _.merge(showdate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, showdate);
    });
  });
};

// Deletes a showdate from the DB.
exports.destroy = function(req, res) {
  Showdate.findById(req.params.id, function (err, showdate) {
    if(err) { return handleError(res, err); }
    if(!showdate) { return res.send(404); }
    showdate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}