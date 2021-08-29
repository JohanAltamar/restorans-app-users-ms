const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_ATLAS;

const dbConnection = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log("Database connected.");
  } catch (error) {
    console.log(error.message);
    throw new Error("Database connection fail while starting ...");
  }
};

module.exports = dbConnection;
