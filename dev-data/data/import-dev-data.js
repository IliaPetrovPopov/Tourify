const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {});
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

(async () => {
  try {
    await connectDB();
    
    const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours.json', 'utf-8'));

    const importData = async () => {
      try {
        await Tour.create(tours);
        console.log("Data imported successfully");
      } catch (error) {
        console.error("Error importing data:", error.message);
      } finally {
        process.exit();
      }
    };

    const deleteAllData = async () => {
      try {
        await Tour.deleteMany();
        console.log("All data deleted successfully");
      } catch (error) {
        console.error("Error deleting data:", error.message);
      } finally {
        process.exit();
      }
    };

    if (process.argv[2] === '--import') {
      await importData();
    } else if (process.argv[2] === '--delete') {
      await deleteAllData();
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1); // exit with a non-zero status code to indicate failure
  }
})();
