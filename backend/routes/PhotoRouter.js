const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');


router.post("/", async (request, response) => {});

router.get("/photosOfUser/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const photos = await Photo.find({ user_id: id }).populate("comments.user_id");
    // console.log(photos)
    // console.log(request.cookies.userId)
    response.send(photos);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post("/commentsOfPhoto/:photo_id", async (request, response) => {
  console.log(request.session.userId)
  try {
    const { comment } = request.body;
    const { photo_id } = request.params;
    console.log(request.cookies.userId);
    const userId = request.cookies.userId; // Assuming you're storing the logged in user's id in the session
    // console.log(userId)
    if (!comment) {
      return response.status(400).send({ error: 'Comment cannot be empty' });
    }

    const newComment = {
      comment,
      user_id: userId,
      date_time: new Date(),
    };

    const photo = await Photo.findById(photo_id);
    photo.comments.push(newComment);
    await photo.save();

    response.send(newComment);
  } catch (error) {
    response.status(500).send({ error });
  }
});

const storage = multer.diskStorage({
  destination: '../frontend/public/images/',
  filename: function (req, file, cb) {
    // Generate a unique filename using crypto
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  },
});
const upload = multer({ storage: storage });
router.post('/photos/new', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file in POST request' });
  }
  console.log(req.cookies.userId)
  const newPhoto = new Photo({
    
    file_name: req.file.filename,
    date_time: new Date(),
    user_id: req.cookies.userId // Assuming you're storing the logged in user's id in the cookies
  });

  try {
    await newPhoto.save();
    res.status(200).send({ message: 'Photo uploaded successfully' });
  } catch (error) {
    console.error('Failed to save photo:', error);
    res.status(500).send({ error: 'Failed to save photo' });
  }

});
const processFormBody = multer({storage: multer.memoryStorage()}).single('uploadedphoto');
// router.post('/photos/new', (req, res) => {
//   processFormBody(req, res, function (err) {
//     if (err || !req.file) {
//       // Handle error
//       return;
//     }
//     const userId = req.body.userId;

//     const timestamp = new Date().valueOf();
//     const filename = 'U' +  String(timestamp) + req.file.originalname;

//     fs.writeFile("./images/" + filename, req.file.buffer, function (err) {
//       // Handle error, create Photo object in the database
//     });
//   });
// });
module.exports = router;
