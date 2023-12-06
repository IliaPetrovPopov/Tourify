const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

(async () => {
  await mongoose.connect(DB, {});
})();

const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
  } catch (error) {
    console.log(error.message);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteAllData();
}

console.log(process.argv);
process.exit();
