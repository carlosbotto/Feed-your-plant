// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Plant = require("../models/Plant");

const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/feed-your-plant", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//_____________________________________________

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email: "alice@gmail.com"
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    email: "bob@gmail.com"
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

//_____________________________________________

let plants = [
  {
    name: "Monstera",
    waterFrquencyInDays: 4,
    picPath: "../images/DB_plants/Monstera.jpg",
    description: "When its soil becomes dry to a depth of 1-2”, water your monstera directly into the pot so not to moisten foliage and just enough to keep the soil from completely drying out. Your Monstera is somewhat drought tolerant, so you don’t need to worry about keeping up with the watering all the time. Don’t allow the pot to stand in water, as this will cause root rot.",
  },
  {
    name: "Ficus Benjamino",
    waterFrquencyInDays: 9,
    picPath: "String",
    description: "Lorem ipsu Ficusssssssss",
    
  }
];

Plant.deleteMany()
  .then(() => {
    return Plant.create(plants);
  })
  .then(createdDocuments => {
    console.log(
      createdDocuments.length +
        " documents have been created in the collection 'plants'"
    );
    mongoose.connection.close();
  });
