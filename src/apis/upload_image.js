const { addImagePath } = require("../db/queries/queries");
const validateUser = require("../utils/validation");
const uploadFile = require("../utils/uploadFile");

const upload_image = (app) => {
  app.post("/upload-image", validateUser, uploadFile, async (req, res) => {
    try {
      const user_id = req.header("user_id");
      const path = req.file.path;

      const uploadedImage = await addImagePath({ user_id, path });
      res
        .status(200)
        .json({ title: "Image Uploaded Successfully", details: uploadedImage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        title: "Internal Server Error",
        message: "Something went wrong!",
      });
    }
  });
};

module.exports = upload_image;
