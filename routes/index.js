const express = require("express");
const User = require("../models/User");
const PlantFamily = require("../models/PlantFamily");
const PlantUser = require("../models/PlantUser");
const { checkLogin } = require("../middlewares");
const multer = require("multer");
const upload = multer({ dest: './public/uploads/' });
const uploadCloud = require('../config/cloudinary.js');


const router = express.Router();

// GET home page
router.get("/", (req, res, next) => {
  res.render("index", {homePage: true});
});

// GET profile-my-garden page
router.get("/profile", checkLogin, (req, res, next) => {
  PlantUser
    .find({ _user: req.user._id }) // To filter the plants of each user
    .sort( {created_at: -1} ) // To sort the plant in descending order of creation date
    .then(plantUsers => {
      res.render("profile", { user: req.user, plantUsers }); // When connected, req.user is defined
    });
});

// EDIT THE PROFILE
// Route to display a form
router.get("/edit-email/:userId", checkLogin, (req, res, next) => {
  User
  .findById(req.params.userId)
  .then(user => {
    res.render("edit-email", {
      user: user
    })
  });
});

// Route to handle the form
router.post("/edit-email/:userId", checkLogin, (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, {
  email: req.body.email
  })
    .then(user => {
    res.redirect("/profile");
  });
});


// GET plants page
router.get("/plants", (req, res, next) => {
  PlantFamily
  .find()
  .sort( {name: 1} ) // To sort the plant by alphabetical order
  .then(plants => {
    res.render("plants", {
      plants: plants
    });
  });
});

// CREATE
// Route to display a form
router.get("/add-plant", checkLogin, (req, res, next) => {
  let { plantFamilyId } = req.query
  if (!plantFamilyId) {
    res.render("add-plant");
  }
  else {
    PlantFamily.findById(plantFamilyId).then(plant => {
      res.render("add-plant", { plant });
    });
  }
});

// Route to handle the form
router.post('/add-plant', checkLogin, uploadCloud.single('photo'), (req, res, next) => {
  let { name, description, waterFrequencyInDays, picPath } = req.body;
  // If req.file is defined, it means the user has uploaded a picture and so we modify the picPath
  if (req.file) {
    picPath = req.file.url // or .secure_url
  }
  const _user = req.user._id;
  // const _plant = req.plant._id;
  const newPlantUser = new PlantUser({name, description, waterFrequencyInDays, picPath, _user})
  newPlantUser
  .save()
  .then( photo => {
    res.redirect('/profile'); // Once the plant is created, go to profile to display it
  })
  .catch(error => {
    console.log(error);
  })
});

// EDIT THE PLANT-USER
// Route to display a form
router.get("/edit-plant-user/:plantUserId", checkLogin, (req, res, next) => {
  PlantUser
  .findById(req.params.plantUserId)
  .then(plantUsers => {
    res.render('edit-plant-user', {plantUsers})
  });
});

// Route to handle the form
router.post("/edit-plant-user/:plantUserId", checkLogin, uploadCloud.single('photo'), (req, res, next) => {
  let updates = {
    name: req.body.name,
    description: req.body.description,
    waterFrequencyInDays: req.body.waterFrequencyInDays,
  }
  if (req.file) {
    updates.picPath = req.file.url
  }
  PlantUser
  .findByIdAndUpdate(req.params.plantUserId, updates).then(plantUsers => {
    // Redirect to the profile-my-garden
    res.redirect('/profile');
  });
});

// REMOVE
// Route to remove a plantUser (and also a plant???)
router.get("/remove-plant/:plantUserId", (req, res, next) => {
  PlantUser
  .findByIdAndRemove(req.params.plantUserId)
  .then(plantUsers => {
    res.redirect('/profile');
  });
});

// GET reminder
router.get("/reminder", checkLogin, (req, res, next) => {
  PlantUser
    .find({ _user: req.user._id }) // To filter the plants of each user
    .sort( {created_at: -1} ) // To sort the plant in descending order of creation date
    .then(plantUsers => {
      res.render("reminder", { user: req.user, plantUsers }); // When connected, req.user is defined
    });
});

module.exports = router;