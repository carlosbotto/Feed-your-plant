![logo_feed_your_plant](https://i.postimg.cc/MTnPBYQN/plantreminder.png)

#Our IronHack project <Feed Your Plant>

[Link to Heroku](https://feedyourplant.herokuapp.com/)

##Project chosen: Watering reminder for Plant Lovers
Since my colleague and I are both passionate about gardening and indoor plants, we agreed about the difficulty to remember the different watering needs that every specific plants have.
We decided to create a simple interface that enables the user to create his own virtual garden in two different ways: by adding the sample plants provided inside our archive, with the possibility to customise their information, or by creating his own new plants. Starting from the creation date, all the plants are displayed and saved in the “garden” page. Their specific watering need, expressed in days, is saved and stored inside the “reminder”, a calendar that shows a watering plan of seven days. There is the possibility to receive the reminder by email.

##Possible improvements
1. Watering need changes depending on the weather conditions. We could create a second variable for the winter season. Anyway the “water frequency” remains always customisable by the user.
2. We created a small archive with the most common indoor plants. This archive is stored in our bin/seeds.js and is customisable only by us. For more specific and detailed information we could access to a botanical database (a good API, for example, is [Trefle](https://trefle.io/)).
3. We could let the users enter in touch with each other by sharing their virtual garden: since every plant has a “description” field, the users could write there their personal experience and ideas with the specific plant. In this way the app could become a kind of “botanical social network”.

##Technologies and tools used
1. JavaScript (ES6), Node.js
2. Hbs, CSS (Bootstrap)
3. Express
4. MongoDB, Mongoose
5. Passport
6. Multer, Cloudinary
7. Nodemailer

Thanks for reading :herb:

![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

##Useful info

### To install before running
```
$ npm install dotenv
$ npm install bootstrap
$ npm install --save  multer
$ npm install --save cloudinary multer-storage-cloudinary multer
$ npm install nodemailer
```

###To run the project
```
$ node bin/seeds.js
$ npm run dev
```

## Deploy Heroku
```
$ git push heroku master
```
In the console of Heroku:
```
$ node bin/seeds.js
```
