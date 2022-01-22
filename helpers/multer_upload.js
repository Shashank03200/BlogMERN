const path = require("path");
const multer = require("multer");

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return callback(new Error("Only images are allowed"));
  }
  callback(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file.filename);
    cb(null);
  },
});

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: fileFilter,
  limits: 1024 * 1024,
}).single("postImage");

module.exports = upload;
