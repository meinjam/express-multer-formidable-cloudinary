const express = require('express');
const formidable = require('formidable');
const multer = require('multer');
const upload = multer();
const { uploadCloudinary } = require('../config/cloudinary');

const router = express.Router();

// with formidable
router.post('/formidable', async (req, res) => {
  try {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      const title = fields.title;
      const image = files.image;

      const uploadImageToCloudinary = await uploadCloudinary(image.filepath);

      // console.log(JSON.stringify(uploadImageToCloudinary));

      const response = {
        title: title,
        url: uploadImageToCloudinary.secure_url,
        id: Date.now(),
      };

      res.status(200).json(response);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// with multer
router.post('/multer', upload.single('image'), async (req, res) => {
  const b64 = Buffer.from(req.file.buffer).toString('base64');
  let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

  const title = req.body.title;

  const imgDetails = await uploadCloudinary(dataURI);

  // console.log(uploadCloudinary);

  const response = {
    title: title,
    url: imgDetails.secure_url,
    id: Date.now(),
  };

  res.status(200).json(response);
});

module.exports = router;
