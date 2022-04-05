'use strict';

//Import mongoose module
const mongoose = require('mongoose');

//Definition the schema of Categorie
const categorySchema = mongoose.Schema(
  {
    name: {type: String, maxLength: 100, required: true, index: true},
    image: {type: String, maxLength: 500},
    icon: {type: String, maxLength: 500},
    adverts: [{type: mongoose.Types.ObjectId, ref: 'Advertisement'}]
  },
  {timestamps: true}
);

// Create the model
const Category = mongoose.model('Category', categorySchema);

// Export model
module.exports = Category;
