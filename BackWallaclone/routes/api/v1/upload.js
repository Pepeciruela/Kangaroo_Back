'use strict';

const express = require('express');
const router = express.Router();
const isAuth = require('../../../middlewares/auth');
const uploadFile = require('../../../middlewares/multerSingleFileConfigure');
const uploadFiles = require('../../../middlewares/multerMultipleFilesConfigure');

const {
  uploadFileLocal,
  uploadFileCloudinary,
  uploadFileProfileCloudinary,
  uploadFilesCloudinary
} = require('../../../controllers/uploadFilesController.js');

router.post('/file-local', isAuth, uploadFile, uploadFileLocal);
router.post('/file', isAuth, uploadFile, uploadFileCloudinary);
router.post('/file-profile', isAuth, uploadFile, uploadFileProfileCloudinary);
router.post('/files', isAuth, uploadFiles, uploadFilesCloudinary);

module.exports = router;
