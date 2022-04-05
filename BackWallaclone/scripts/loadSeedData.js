'use strict';

// Conection database
const dbConnection = require('../services/connectionBD_Mongo');

//Import models
const advertisementModel = require('../models/Advertisement');
const userModel = require('../models/User');
const categoryModel = require('../models/Category');

//Import data
// const advertisementSeedData = require('./seedData/advertisementSeedData');
const advertisementSeedData = require('./seedData/advertisementSeedDataManual');
const userSeedData = require('./seedData/usersAdminSeedData');
const categoriesSeedData = require('./seedData/categoriesSeedData');

main().catch((err) => console.log('There was an error', err));

async function main() {
  await initUsers();
  await initCategories();
  await initAdvertisement();
  dbConnection.close();
}

//================================================================
//Create mock users in database
//================================================================
async function initUsers() {
  // Delete possible users
  const deletedUsers = await userModel.deleteMany();
  console.log(`Deleted ${deletedUsers.deletedCount} users.`);

  // Create mockData users
  const users = await userModel.insertMany(userSeedData.users);

  // Create mockData users
  console.log(`Create ${users.length} users.`);
}

//================================================================
//Create mock categories in database
//================================================================
async function initCategories() {
  // Delete possible users
  const deletedCategories = await categoryModel.deleteMany();
  console.log(`Deleted ${deletedCategories.deletedCount} categories.`);

  // Create mockData users
  const categories = await categoryModel.insertMany(categoriesSeedData.categories);

  // Create mockData users
  console.log(`Create ${categories.length} categories.`);
}

//================================================================
//Create mock advertisements in database
//================================================================
async function initAdvertisement() {
  // Delete possible advertisements
  const deletedAdvertisements = await advertisementModel.deleteMany();
  console.log(`Deleted ${deletedAdvertisements.deletedCount} advertisements.`);

  //Search user id for asociate advertisement with user admin
  // const userAdmin = await userModel.findOne({email: 'admin@kangaroo.com'});
  const usersList = await userModel.find();
  const categoriesList = await categoryModel.find();

  //Asociate advertisement with user hosted id
  const advertisementsWithAuthor = advertisementSeedData.advertisements.map((advertisement) => {
    advertisement.categories = [
      categoriesList[Math.floor(Math.random() * categoriesList.length)]._id,
      categoriesList[Math.floor(Math.random() * categoriesList.length)]._id
    ];
    advertisement.author = usersList[Math.floor(Math.random() * usersList.length)]._id;
    advertisement.reviews.author = usersList[Math.floor(Math.random() * usersList.length)]._id;
    return advertisement;
  });

  // Create mockData advertisements
  const advertisementsInsert = await advertisementModel.insertMany(advertisementsWithAuthor);
  console.log(`Create ${advertisementsInsert.length} advertisements.`);
}
