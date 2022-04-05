'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/jwtAuth');
const {
  getCategoriesList,
  getCategoryForId,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../../../controllers/categoryController.js');

// Routes
router.get('/', getCategoriesList);
router.get('/:categoryId', getCategoryForId);
router.post('/', createCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

module.exports = router;
