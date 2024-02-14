const multer = require("multer");

const uploadFile = (req, res, next) => {
  const user_id = req.header("user_id");

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/../uploadedImages");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filenameAndExtension = file.originalname.split(".");
      cb(
        null,
        `${filenameAndExtension[0]}-${user_id}-${uniqueSuffix}.${filenameAndExtension[1]}`
      );
    },
  });

  const upload = multer({ storage: storage }).single("image");

  upload(req, res, next, (err) => {
    if (err) {
      return res.status(500).json({
        title: "Internal Server Error",
        message: "Failed to upload image",
        error: err,
      });
    } else {
      next();
    }
  });
};

module.exports = uploadFile;
