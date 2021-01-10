const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express js
const app = express();

// Import routes
const homeRoutes = require('./routes/home');
const usersRoutes = require('./routes/users');

// Use body-parser express
app.use(bodyParser.urlencoded({extended: false}));
// Express static directory to "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(homeRoutes);
app.use(usersRoutes);
app.use((req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);