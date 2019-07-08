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
  res.render("profile", { user: req.user }); // When connected, req.user is defined
});

router.get("/plants", (req, res, next) => {
  Plant.find().then(plants => {
    res.render("plants", {
      plants: plants
    });
  });
});

router.get("/add-plant", (req, res, next) => {
  PlantUser.find()
  .then(plantUsers => {
    res.render('add-plant', {plantUsers})
  })
});


// router.post('/upload', upload.single('photo'), (req, res) => {
//   //console.log("TCL: req.file", req.file)
//   const pic = new Picture({
//     name: req.body.name,
//     path: `/uploads/${req.file.filename}`,
//     originalName: req.file.originalname
//   });

//   pic.save((err) => {
//       res.redirect('/');
//   });
// });


router.post('/add-plant', uploadCloud.single('photo'), (req, res, next) => {
  const { name, description } = req.body;
  const picPath = req.file.url;
  const imgName = req.file.originalname;
  const newPlantUser = new PlantUser({name, description, picPath})
  newPlantUser.save()
  .then( photo => {
    res.redirect('/add-plant');
  })
  .catch(error => {
    console.log(error);
  })
});






module.exports = router;
