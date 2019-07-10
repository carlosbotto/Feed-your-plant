// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const PlantFamily = require("../models/PlantFamily");
const PlantUser = require("../models/PlantUser");

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
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
  },
  {
    username: "giulia",
    password: bcrypt.hashSync("giulia", bcrypt.genSaltSync(bcryptSalt)),
    email: "giulia@gmail.com"
  },
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
    waterFrequencyInDays: 4,
    picPath: "/images/DB_plants/Monstera.jpg",
    description: "Water your monstera directly into the pot so not to moisten foliage and just enough to keep the soil from completely drying out. Your Monstera is somewhat drought tolerant, so you don’t need to worry about keeping up with the watering all the time. Don’t allow the pot to stand in water, as this will cause root rot."
  },
  {
    name: "Ficus Lyrata",
    waterFrequencyInDays: 9,
    picPath: "/images/DB_plants/ficus_lyrata.jpg",
    description: "Water when the top soil becomes slightly dry and reduce watering in the winter. The worst thing to do is to over water (not underwater) because lack of water is easily fixed, unlike the damage from over-watering.",
  },
  {
    name: "Boston Fern",
    waterFrequencyInDays: 2,
    picPath: "/images/DB_plants/boston_fern.jpg",
    description: "Water the fern when the soil becomes damp. Do not allow the soil to dry out. This may mean watering twice a week or daily in hot weather. The frequency will change depending on the temperature and moisture in your home. Add enough water so that it flows out the drainage holes on the bottom of the container."
  },
  {
    name: "Ficus Alii",
    waterFrequencyInDays: 2,
    picPath: "/images/DB_plants/ficus_alii.jpg",
    description: "Allow the top centimetre (5 cm) or so of potting mixture to dry out between waterings. When watering, water thoroughly giving enough water to make the potting mixture moist.  Use tepid water, as cold water may cause leaf loss. Do not allow the plant to stand in water or do not allow the potting mixture to dry out."
  },
  {
    name: "Kentia Palm",
    waterFrequencyInDays: 2,
    picPath: "/images/DB_plants/kentia_palm.jpg",
    description: "Since consistently overwatering your Kentia palm can lead to root rot and its death, it’s best to follow some type of soil check and watering schedule to produce healthy growth and alleviate potential problems. Kentia palms have a moderate tolerance to drought conditions, so it’s better to miss a watering than overdo it and create soggy soil conditions."
  },
  {
    name: "Ponytail Palm",
    waterFrequencyInDays: 2,
    picPath: "/images/DB_plants/ponytail.jpg",
    description: "Overwatering can result in stem rot. If you withhold watering, the plant may be able to internally cure the problem. Signs of stem rot include yellowing leaves and a caudex that is soft or squishy. Spider mites occur on the leaves, but can be fixed by rubbing a cloth of soap and water on the stems. Spider mites are evidenced by the presence of spider-like webbing on the plant."
  },
  {
    name: "Rubber Plant",
    waterFrequencyInDays: 2,
    picPath: "/images/DB_plants/rubber_plant.jpg",
    description: "Rubber plants’ water needs vary according to season: In the growing season (summer), the plant should be kept moist. This includes wiping the leaves with a damp cloth or even misting them. During the dormant season, your plant may only need water once or twice a month. Watch for droopy leaves, which indicate a need for more water. Leaves that turn yellow and brown and drop signal over-watering.",
  },
  {
    name: "Snake Plant",
    waterFrequencyInDays: 2,
    picPath: "/images/DB_plants/snake_plant.jpg",
    description: "Easy does it with the watering. You want to be careful not to overdo it because your plant will rot out.  Always make sure the soil is almost completely dry before thoroughly watering again. Water your Snake Plants every 2-6 weeks, depending on your home’s temperature, light levels, and humidity. So, if you travel or tend to ignore plants, this is the 1 for you.",
  },
  {
    name: "Philodendroa",
    waterFrequencyInDays: 2,
    picPath: "/images/DB_plants/philodendroa.jpg",
    description: "RPhilodendrons may be grown in soil or just in water. Plants that live in soil should be watered when half of the soil is dry. As with most plants, yellow leaves indicate over-watering and brown leaves indicate under-watering. You can tell when a philodendron needs water because its leaves will appear wilted. When watered, the plant will reward you with a perky appearance.",
  },
  {
    name: "Peace Lily",
    waterFrequencyInDays: 2,
    picPath: "/images/DB_plants/peace_lily.jpg",
    description: "If you’re wondering how often to water a peace lily, one tip is to wait for the plant to droop slightly before watering. One of the great advantages in caring for the peace lily is the fact that it sags a bit when it needs water, essentially telling you when it’s thirsty. Throughout the summer growing season, spritz the leaves with soft or distilled water. Water your plant less often in winter.",
  }
  
];

PlantFamily.deleteMany()
  .then(() => {
    return PlantFamily.create(plants);
  })
  .then(createdDocuments => {
    console.log(
      createdDocuments.length +
        " documents have been created in the collection 'plants'"
    );
    mongoose.connection.close();
  });

// ---------------------------------------------------------------------

// THIS IS NOT WORKING
let plantusers = [
  {
    name: "palma",
    waterFrequencyInDays: 5,
    picPath: "/images/plant-user/palma.jpg",
    description: "una bellissima palma",
    _user: users._id
  }
];

PlantUser.deleteMany()
  .then(() => {
    return PlantUser.create(plantusers);
  })
  .then(plantUsersCreated => {
    console.log(
      plantUsersCreated.length +
        " documents have been created in the collection 'plantusers'"
    );
    mongoose.connection.close();
  });
