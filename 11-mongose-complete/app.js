// import third package
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import controller & model
const errorController = require('./controllers/error');
const User = require('./models/user');

// initialize express
const app = express();

// configure template engine
app.set('view engine', 'ejs');
// set folder views
app.set('views', 'views');

// import routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// set project default
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// get user request
app.use((req, res, next) => {
  User.findById('600e6199fcba54318c8a76c9')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// define routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// define database
mongoose
  .connect(
    'mongodb://Tegar:7hKcyOkJHbfkeMS0@mycluster-shard-00-00.iazfi.mongodb.net:27017,mycluster-shard-00-01.iazfi.mongodb.net:27017,mycluster-shard-00-02.iazfi.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-3wt673-shard-0&authSource=admin&retryWrites=true&w=majority',
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Tegar',
          email: 'tegar@mail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
