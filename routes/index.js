const express = require("express");
const Plant = require("../models/Plant");
const PlantUser = require("../models/PlantUser");
const { checkLogin } = require("../middlewares");
const multer = require("multer");
const upload = multer({ dest: './public/uploads/' });
const uploadCloud = require('../config/cloudinary.js');


const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {homePage: true});
});

router.get("/profile", checkLogin, (req, res, next) => {
  PlantUser.find({ _user: req.user._id }) // To filter the plants of each user
  .then(plantUsers => {
    res.render("profile", { user: req.user, plantUsers }); // When connected, req.user is defined
  })
});

router.get("/plants", (req, res, next) => {
  Plant
  .find()
  .sort( {name: 1} ) // To sort the plant by alphabetical order
  .then(plants => {
    res.render("plants", {
      plants: plants
    });
  });
});

router.get("/add-plant", checkLogin, (req, res, next) => {
  PlantUser.find()
  .then(plantUsers => {
    res.render('add-plant', {plantUsers})
  })
});

router.post('/add-plant', checkLogin, uploadCloud.single('photo'), (req, res, next) => {
  const { name, description, waterFrequencyInDays } = req.body;
  const picPath = req.file.url;
  const _user = req.user._id;
  // const _plant = req.plant._id;
  const newPlantUser = new PlantUser({name, description, waterFrequencyInDays, picPath, _user})
  newPlantUser.save()
  .then( photo => {
    res.redirect('/profile'); // Once the plant is created, go to profile to display it
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;
