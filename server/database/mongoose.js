const mongoose = require("mongoose");
const chalk = require("chalk");

exports.connect = async (url) => {
  try {
    await mongoose.connect(url, {
      poolSize: 200,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 120000,
      connectTimeoutMS: 120000,
    });

    console.log(chalk.bold.rgb(10, 100, 155)("MongoDB Server:", url));

    const mongo = mongoose.connection;
    mongo.on("error", (error) => {
      console.error(chalk.bold.red("mongo: " + error.name));
    });
    // mongo.on("connected", () => {
      console.log(chalk.bold.rgb(10, 100, 155)("mongo: Connected"));
    // });
    mongo.on("disconnected", () => {
      console.log(chalk.bold.rgb(10, 100, 155)("mongo: Disconnected"));
    });
  } catch (err) {
    console.error(err);
  }
};
