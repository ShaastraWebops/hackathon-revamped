'use strict';

var express = require('express');
var app = express()
var controller = require('./img.controller');
var multer  = require('multer')
var storage = require('../../components/imageStorage').storage;
var upload = multer({ storage: storage, limits: {fileSize: 10000000}});
var router = express.Router();
var auth = require('../../auth/auth.service');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), upload.single('file'), controller.create);
router.post('/upload', upload.single('file'), controller.create);
router.post('/query',controller.createQuery);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/files/:eventId', controller.getFiles);
router.get('/:eventId/:fileName', controller.download);

module.exports = router;
