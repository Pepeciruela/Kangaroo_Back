'use strict';

const express = require('express');
const uploadFile = require('../../../middlewares/multerSingleFileConfigure');
const isAuth = require('../../../middlewares/auth');

const router = express.Router();
const {
  getAdvertisementsList,
  getPaginatedAdvertisementsList,
  getAdvertById,
  createAdvert,
  updateAdvert,
  deleteAdvert,
  createAdveretReview,
  getTags,
  getAdvertByCategoryId,
  getAdvertByAuthorId
} = require('../../../controllers/advertisementController.js');

// Routes
router.get('/tags', getTags);
router.get('/categories/:categoriesId', getAdvertByCategoryId);
router.get('/author/:authorId', getAdvertByAuthorId);
router.get('/', getAdvertisementsList);
router.get('/:p&:page', getPaginatedAdvertisementsList);
router.get('/:advertId', getAdvertById);
router.post('/', isAuth, createAdvert);
router.post('/:advertId/reviews', isAuth, createAdveretReview);
router.put('/:advertId', isAuth, updateAdvert);
router.delete('/:advertId', isAuth, deleteAdvert);

module.exports = router;
