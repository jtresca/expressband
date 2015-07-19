'use strict';

var _ = require('lodash');
var Mailinglist = require('./mailinglist.model');

// Get list of mailinglists
exports.index = function(req, res) {
  Mailinglist.find(function (err, mailinglists) {
    if(err) { return handleError(res, err); }
    return res.json(200, mailinglists);
  });
};

// Get a single mailinglist
exports.show = function(req, res) {
  Mailinglist.findById(req.params.id, function (err, mailinglist) {
    if(err) { return handleError(res, err); }
    if(!mailinglist) { return res.send(404); }
    return res.json(mailinglist);
  });
};

// Creates a new mailinglist in the DB.
exports.create = function(req, res) {
  Mailinglist.create(req.body, function(err, mailinglist) {
    if(err) { return handleError(res, err); }
    // console.log(mailinglist);
    return res.json(201, mailinglist);
  });
};

// Updates an existing mailinglist in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mailinglist.findById(req.params.id, function (err, mailinglist) {
    if (err) { return handleError(res, err); }
    if(!mailinglist) { return res.send(404); }
    var updated = _.merge(mailinglist, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mailinglist);
    });
  });
};

// Deletes a mailinglist from the DB.
exports.destroy = function(req, res) {
  Mailinglist.findById(req.params.id, function (err, mailinglist) {
    if(err) { return handleError(res, err); }
    if(!mailinglist) { return res.send(404); }
    mailinglist.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}