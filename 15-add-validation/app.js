// Import third package
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

// import file
const errorController = require('./controllers/error');
const User = require('./models/user');

// mongodb uri
const MONGODB_URI =
  'mongodb://Tegar:7hKcyOkJHbfkeMS0@mycluster-shard-00-00.iazfi.mongodb.net:27017,mycluster-shard-00-01.iazfi.mongodb.net:27017,mycluster-shard-00-02.iazfi.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-3wt673-shard-0&authSource=admin&retryWrites=true&w=majority';

  // define express
const app = express();

// define storing session in mongodb
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions' 
});

// define csrf
const csrfProtection = csrf();

// define template engine
app.set('view engine', 'ejs');

// define folder "views"
app.set('views', 'views');

// import routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// use body-parser package
app.use(bodyParser.urlencoded({ extended: false }));

// set public folder for css & js
app.use(express.static(path.join(__dirname, 'public')));

// configure session
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// use csrf & flash for this project
app.use(csrfProtection);
app.use(flash());

// check session user
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();                                                                         
    })
    .catch(err => console.log(err));
});

// define local variable for store session loggein & csrf
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// define routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

// connect to mongodb
mongoose
  .connect(MONGODB_URI,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
