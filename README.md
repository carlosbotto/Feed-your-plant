
## To install before running

$ npm install dotenv
$ npm install bootstrap
$ npm install --save  multer
$ npm install --save cloudinary multer-storage-cloudinary multer


$ node bin/seeds.js


## Deploy Heroku

For the existing repositories, simply add the heroku remote
$ heroku git:remote -a feedyourplant

From the .env file:
- PORT and ENV are already inside
- The other parameters should be added going to Settings

$ git push heroku master

$ heroku run ls

$ n

If error:
$ heroku logs --tail

## Nodemailer
$ npm install nodemailer
