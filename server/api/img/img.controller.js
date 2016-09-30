'use strict';

var _ = require('lodash');
var Img = require('./img.model');
var mkdirp = require('mkdirp');
var compose = require('composable-middleware');


// Get list of imgs
exports.index = function(req, res) {
  Img.find(function (err, imgs) {
    if(err) { return handleError(res, err); }
    return res.json(200, imgs);
  });
};

// Get a single img
exports.show = function(req, res) {
  Img.findById(req.params.id, function (err, img) {
    if(err) { return handleError(res, err); }
    if(!img) { return res.send(404); }
    return res.json(img);
  });
};

// Creates a new img in the DB.
exports.create = function(req, res) {
  console.log("came");
  return res.json(201, {message: "Boom!"});
  /*Img.create(req.body, function(err, img) {
    if(err) { return handleError(res, err); }
    return res.json(201, img);
  });*/
};

exports.createDirectory = function(req, res) {
  // mkdirp('client/assets/uploads/', function (err) {
  //   if (err) console.error(err)
  //   else console.log('pow!')
  // });

  return compose()
    .use(function(req, res, next) {
      console.log(req);
      next();
    });
};

exports.createQuery = function(req, res) {
  // console.log(req.user.name);
  Img.create(req.body, function(err, img) {
    if(err) { return handleError(res, err); }
    return res.json(201, img);
   });
};


// Updates an existing img in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Img.findById(req.params.id, function (err, img) {
    if (err) { return handleError(res, err); }
    if(!img) { return res.send(404); }
    var updated = _.merge(img, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, img);
    });
  });
};

// Deletes a img from the DB.
exports.destroy = function(req, res) {
  Img.findById(req.params.id, function (err, img) {
    if(err) { return handleError(res, err); }
    if(!img) { return res.send(404); }
    img.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
