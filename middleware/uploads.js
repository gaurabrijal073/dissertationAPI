const multer = require("multer");

const storage = multer.diskStorage({
    // where to store
    destination : function(req, file, cb){
        cb(null, "./public/images")
    },
    // what to store
    filename : function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = function(req, file, cb){
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true)
    }
    else{
        cb(false)
    }
}

const upload = multer({
    storage:storage,
    // fileFilter: fileFilter
});

module.exports = upload;