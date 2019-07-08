const express = require('express');
const Plant = require("../models/Plant");

const router  = express.Router();


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get("/plants", (req, res, next) => {
  Plant.find()
    .then(plants => {
      res.render("plants", {
        plants: plants
      });
    });
});


module.exports = router;
