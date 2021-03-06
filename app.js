require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash      = require("connect-flash");
    

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});

hbs.registerHelper('ifShouldDisplayLink', (link, user, options) => {
  if ((!link.forConnectedUsers && !link.forDisconnectedUsers) || (link.forConnectedUsers && user) || (link.forDisconnectedUsers && !user)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('ifEquals', (value1, value2, options) => {
  if (value1 === value2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper('ifStartsWith', (longValue, shortValue, options) => {
  if (longValue.startsWith(shortValue)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// To define when the plant should be watered
hbs.registerHelper('shouldWater', (plantUser, day, options) => {
  console.log("DEBUG", plantUser.created_at, day)
  let diffInDays = Math.ceil((day-plantUser.created_at)/1000/60/60/24)
  if (diffInDays % plantUser.waterFrequencyInDays === 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


// To display singular or plural depending on waterFrequencyInDays
hbs.registerHelper('waterFrequencyPhrase', (waterFrequencyInDays) => {
  if (waterFrequencyInDays === 1) {
    return ` every day`;
  } else {
    return ` every ${waterFrequencyInDays} days`
  }
});





// TO DISPLAY A NICE DATE FORMAT 
// New HBS helper 
// To use it in a .hbs file:
// {{formatDate myDate}}
// It will display the return value of the next function
hbs.registerHelper('formatDate', (date) => {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return getOrdinalNum(date.getDate()) + ' '
  + (months[date.getMonth()]) + ' '
  + (date.getFullYear())
});

function getOrdinalNum(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

// TO DISPLAY DATE ON TABLE 
hbs.registerHelper('formatDateTable', (date) => {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()] + ' '
  + (date.getDate()) + ' '
  + (months[date.getMonth()])
});

// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);
    
// Middleware always executed before the routes
app.use((req, res, next) => {
  console.log("Own middleware");
  res.locals.user = req.user; // Define a view variable "user" that is req.user
  res.locals.url = req.url; // Define a view variable "url" that is req.user
  res.locals.navlinks = [
    { name: "Plants", href: "/plants" },
    { name: "My garden", href: "/profile", forConnectedUsers: true },
    { name: "Add Plant", href: "/add-plant", forConnectedUsers: true },
    { name: "Reminder", href: "/reminder", forConnectedUsers: true },
    { name: "Logout", href: "/auth/logout", forConnectedUsers: true },
    { name: "Login", href: "/auth/login", forDisconnectedUsers: true },
    { name: "Signup", href: "/auth/signup", forDisconnectedUsers: true },
  ];
  next();
});

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
      

module.exports = app;
