'use strict';

//Import modules
const faker = require('faker/locale/es');
const fs = require('fs');
var util = require('util');

//Import models
const AdvertisementModel = require('../models/Advertisement.js');
const UserModel = require('../models/User.js');

//Execute general function script
seedLoadData().catch((err) => console.log('There was an error', err));

async function seedLoadData() {
  // await generateSeedUsersData();
  await createSeedAdvertisementData();
  // await generateSeedReviewsData();
}

//================================================================
//Create mock users in database
//================================================================
async function generateSeedUsersData() {
  console.log('Success: Users control role create manual in UsersAdminSeedData file.');
}

//================================================================
//Create mock users in database
//================================================================
async function generateSeedReviewsData() {
  var reviews = [];

  for (let id = 1; id <= 10; id++) {
    reviews.push({
      author: '',
      comment: faker.lorem.paragraph(),
      rating: faker.datatype.number(5)
    });
  }

  fs.writeFileSync(
    './scripts/seedData/reviewsSeedData.js',
    `const data = { reviews:
    ${util.inspect(reviews)}
  }; module.exports=data;`,
    'utf-8'
  );

  console.log('Success: reviews seed data file generated in seedData directory.');
}

//================================================================
//Create mock experiences in database
//================================================================
async function createSeedAdvertisementData() {
  var advertisement = [];

  for (let id = 1; id <= 10; id++) {
    advertisement.push({
      name: faker.commerce.productName(),
      nameEn: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      descriptionEn: faker.lorem.paragraph(),
      type: 'Sale',
      price: faker.datatype.number(3, 150),
      image:
        'https://res.cloudinary.com/kangaroomailer/image/upload/v1647891889/kangaroo/adverts/noimage_deiv4x.jpg',
      categories: [],
      gallery: [
        'https://res.cloudinary.com/kangaroomailer/image/upload/v1647891889/kangaroo/adverts/noimage_deiv4x.jpg',
        'https://res.cloudinary.com/kangaroomailer/image/upload/v1647891889/kangaroo/adverts/noimage_deiv4x.jpg',
        'https://res.cloudinary.com/kangaroomailer/image/upload/v1647891889/kangaroo/adverts/noimage_deiv4x.jpg',
        'https://res.cloudinary.com/kangaroomailer/image/upload/v1647891889/kangaroo/adverts/noimage_deiv4x.jpg'
      ],
      tags: ['tag1', 'tag2'],
      author: '',
      state: 'ForSale',
      reviews: {
        author: '',
        comment: faker.lorem.paragraph(),
        rating: faker.datatype.number(5)
      }
    });
  }

  fs.writeFileSync(
    './scripts/seedData/advertisementSeedData.js',
    `const data = { advertisements: 
      ${util.inspect(advertisement)}
    }; module.exports=data;`,
    'utf-8'
  );

  console.log('Success: advertisements seed data file generated in seedData directory.');
}
