// Import package
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Import file
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

// Initialize express
const app = express();

// Set template path & engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Import routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Configure package
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Dummy user data
app.use((req, res, next) => {
  User.findById('6005266b2aab915fc0b76239')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// Middleware
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});