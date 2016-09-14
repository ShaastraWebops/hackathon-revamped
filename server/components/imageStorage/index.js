var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'client/assets/uploads');
  },
  filename: function (req, file, cb) {
    var ext = file.mimetype.split('/')[1];
    return cb(null, req.user.name + '-' + Date.now() + "." + ext);
  }
})

exports.storage = storage;

