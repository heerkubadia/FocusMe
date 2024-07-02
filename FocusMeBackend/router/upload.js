const express = require('express');
const { uploadPhoto, getAllPhotos, deletePhoto } = require('../controller/upload');
const router = express.Router();

router.post('/photo', uploadPhoto)
router.get('/getallphotos', getAllPhotos)
router.delete('/deletephoto/:id', deletePhoto)

module.exports = router;