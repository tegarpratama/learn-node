// import package
const path = require('path');

// import third package
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

// import file
const errorController = require('./controllers/error');
const User = require('./models/user');

// mongodb uri
const MONGODB_URI =
  'mongodb://Tegar:7hKcyOkJHbfkeMS0@mycluster-shard-00-00.iazfi.mongodb.net:27017,mycluster-shard-00-01.iazfi.mongodb.net:27017,mycluster-shard-00-02.iazfi.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-3wt673-shard-0&authSource=admin&retryWrites=true&w=majority';

// use express
const app = express();

// define variable for package "connect mongodb session"
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

// catch errors for package "connect mongodb session"
store.on('error', function(error) {
  console.log(error);
});

// define csrf
const csrfProtection = csrf();

// define variable for package "multer"
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});

// filter package "multer"
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// setting application
app.set('view engine', 'ejs');
app.set('views', 'views');

// import routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// use "body-parser" package
app.use(bodyParser.urlencoded({ extended: false }));

// use "multer" package
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

// setting static method
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// use "connect mongodb session" package
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// use "csrf" package
app.use(csrfProtection);

// use "connect flash" package
app.use(flash());

// set local variables
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// check session user
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }

      req.user = user;
      next();
    })
    .catch(error => {
      next(new Error(error));
    });
});

// call routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// 505 response
app.get('/500', errorController.get500);

// if there no routes match, this controller will be execute
app.use(errorController.get404);

// for call "next(error)"
app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

// connect to mongodb
mongoose
  .connect(MONGODB_URI,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });