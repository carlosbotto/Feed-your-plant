const express = require("express");
const User = require("../models/User");
const PlantFamily = require("../models/PlantFamily");
const PlantUser = require("../models/PlantUser");
const { checkLogin } = require("../middlewares");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const uploadCloud = require("../config/cloudinary.js");
const nodemailer = require("nodemailer"); // NEW

const router = express.Router();

// GET home page
router.get("/", (req, res, next) => {
  res.render("index", { homePage: true });
});

// GET profile-my-garden page
router.get("/profile", checkLogin, (req, res, next) => {
  PlantUser.find({ _user: req.user._id }) // To filter the plants of each user
    .sort({ created_at: -1 }) // To sort the plant in descending order of creation date
    .then(plantUsers => {
      res.render("profile", { user: req.user, plantUsers }); // When connected, req.user is defined
    });
});

// EDIT THE PROFILE
// Route to display a form
router.get("/edit-email/:userId", checkLogin, (req, res, next) => {
  User.findById(req.params.userId).then(user => {
    res.render("edit-email", {
      user: user
    });
  });
});

// Route to handle the form
router.post("/edit-email/:userId", checkLogin, (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, {
    email: req.body.email
  }).then(user => {
    res.redirect("/profile");
  });
});

// GET plants page
router.get("/plants", (req, res, next) => {
  PlantFamily.find()
    .sort({ name: 1 }) // To sort the plant by alphabetical order
    .then(plants => {
      res.render("plants", {
        plants: plants
      });
    });
});

// CREATE
// Route to display a form
router.get("/add-plant", checkLogin, (req, res, next) => {
  let { plantFamilyId } = req.query;
  if (!plantFamilyId) {
    res.render("add-plant");
  } else {
    PlantFamily.findById(plantFamilyId).then(plant => {
      res.render("add-plant", { plant });
    });
  }
});

// Route to handle the form
router.post(
  "/add-plant",
  checkLogin,
  uploadCloud.single("photo"),
  (req, res, next) => {
    let { name, description, waterFrequencyInDays, picPath } = req.body;
    // If req.file is defined, it means the user has uploaded a picture and so we modify the picPath
    if (req.file) {
      picPath = req.file.url; // or .secure_url
    }
<<<<<<< HEAD

    // PlantUser.findOne({ waterFrequencyInDays }, "waterFrequencyInDays", (err, waterFrequencyInDays) => {
    //   if (typeOf(waterFrequencyInDays) !== Number) {
    //     res.render("/add-plant", { message: "Please insert a frequncy in number"}
    //     );
    //     return;
    //   }

    const _user = req.user._id;
    // const _plant = req.plant._id;
    const newPlantUser = new PlantUser({
      name,
      description,
      waterFrequencyInDays,
      picPath,
      _user
    });
    newPlantUser
=======
  
      const _user = req.user._id;
      // const _plant = req.plant._id;
      const newPlantUser = new PlantUser({
        name,
        description,
        waterFrequencyInDays,
        picPath,
        _user
      });
      newPlantUser
>>>>>>> 32085212bb3583fe704925ab52a2944a1ac48f01
      .save()
      .then(photo => {
        res.redirect("/profile"); // Once the plant is created, go to profile to display it
      })
      .catch(error => {
        console.log(error);
      });
    // })
  }
);

// EDIT THE PLANT-USER
// Route to display a form
router.get("/edit-plant-user/:plantUserId", checkLogin, (req, res, next) => {
  PlantUser.findById(req.params.plantUserId).then(plantUsers => {
    res.render("edit-plant-user", { plantUsers });
  });
});

// Route to handle the form
router.post(
  "/edit-plant-user/:plantUserId",
  checkLogin,
  uploadCloud.single("photo"),
  (req, res, next) => {
    let updates = {
      name: req.body.name,
      description: req.body.description,
      waterFrequencyInDays: req.body.waterFrequencyInDays
    };
    if (req.file) {
      updates.picPath = req.file.url;
    }
    PlantUser.findByIdAndUpdate(req.params.plantUserId, updates).then(
      plantUsers => {
        // Redirect to the profile-my-garden
        res.redirect("/profile");
      }
    );
  }
);

// REMOVE
// Route to remove a plantUser (and also a plant???)
router.get("/remove-plant/:plantUserId", (req, res, next) => {
  PlantUser.findByIdAndRemove(req.params.plantUserId).then(plantUsers => {
    res.redirect("/profile");
  });
});

// GET reminder
router.get("/reminder", checkLogin, (req, res, next) => {
  PlantUser.find({ _user: req.user._id }) // To filter the plants of each user
    .sort({ created_at: -1 }) // To sort the plant in descending order of creation date
    .then(plantUsers => {
      let today = new Date();
      let days = [];
      for (let n = 0; n < 7; n++) {
        let y = today.getFullYear();
        let m = today.getMonth();
        let d = today.getDate() + n;
        days.push(new Date(y, m, d));
      }
      res.render("reminder", {
        plantUsers,
        days: days
      });
    });
});

function shouldWater(plantUser, day) {
  let diffInDays = Math.ceil(
    (day - plantUser.created_at) / 1000 / 60 / 60 / 24
  );
  return diffInDays % plantUser.waterFrequencyInDays === 0;
}

router.get("/send-email", checkLogin, (req, res, next) => {
  // TODO: send emails to everyone with the schedule
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  User.find()
    .then(users => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        PlantUser.find({ _user: user._id }).then(plantUsers => {
          let today = new Date();
          let days = [];
          for (let n = 0; n < 7; n++) {
            let y = today.getFullYear();
            let m = today.getMonth();
            let d = today.getDate() + n;
            days.push(new Date(y, m, d));
          }

          let html = `
          <div style="background-color:rgba(249, 246, 182, 0.9); max-width: 450px; border-radius: 20px">
            <div >
              <img src="https://i.postimg.cc/MTnPBYQN/plantreminder.png"; style="display: block;
              padding-top: 20px;
              padding-bottom: 2px;
              margin-left: auto;
              margin-right: auto;
              width: 20%;">
            </div>
            <h2 style="color:rgb(0,151,87); font-family: garamond; text-decoration: none; line-height: 10%"> <center>Hello ${user.username},</center></h2>
            <h3 style="color:rgb(0,151,87); font-family: garamond; text-decoration: none; padding-bottom:-100px;"> <center>don't forget to water your plants 🌿</center></h3> 
            <span><center style="color:rgb(0,151,87);">_________________________</center></span>
            <br>



            
            <center>
            <table>
            <thead>
            <tr>
            <th></th>
            ${days.map(day => `<th>${day.getDate()}</th>`).join("")}
            </tr>
            </thead>
            <tbody>
            ${plantUsers
              .map(
                plantUser => `
            <tr>
            <td>${plantUser.name}</td>
            ${days
              .map(
                day => `<td>${shouldWater(plantUser, day) ? "💧" : "⟹"}</td>`
              )
              .join("")}
            </tr>
            `
              )
              .join("")}
            </tbody>
            </table>
            <br><br>
            <span ><center style="padding-bottom:30px">Go to <a href="https://feedyourplant.herokuapp.com/" style="text-decoration:none; padding-bottom:30px; font-size: 20px; color:rgb(0,151,87); font-family: garamond; "> Feed your Plant</a></center></span>
            </center>
          </div>`;

          console.log("DEBUG", html);
          transporter.sendMail({
            filename: "losango-plant2",
            from: '"Feed your Plant 🌿" <feedyourplant@gmail.com>',
            to: user.email,
            subject: "Watering Reminder",
            html: html
          });
        });
      }
    })
    // res.json("Hello")
    .then(info => res.redirect("/reminder-sent"))
    // {email, subject, html, message, info}
    .catch(error => console.log(error));
});

// GET reminder sent
router.get("/reminder-sent", (req, res, next) => {
  res.render("reminder-sent");
});

// GET watering hint
router.get("/watering-hint", (req, res, next) => {
  res.render("watering-hint", { wateringPage: true });
});

// GET our project
router.get("/our-project", (req, res, next) => {
  res.render("our-project", { ourProject: true });
});

module.exports = router;