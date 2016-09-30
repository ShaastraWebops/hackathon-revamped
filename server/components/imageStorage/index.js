var multer  = require('multer');
var mkdirp = require('mkdirp');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	var fullname = file.originalname;
  	var ids = fullname.split("-");
  	console.log(ids);
  	mkdirp('./client/assets/uploads/' + ids[0], function (err) {
    	if (err) console.error(err)
    	else{
    		return cb(null, 'client/assets/uploads/' + ids[0]);
    	}
	});
  },
  filename: function (req, file, cb) {
    var ext = file.mimetype.split('/')[1];
    return cb(null, file.originalname + "." + ext);
  }
})

exports.storage = storage;

