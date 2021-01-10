const express = require('express');

// Initialize express js
const app = express();

// Middleware
app.use((req, res, next) => {
   console.log('In the middleware');
   next(); // Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
   console.log('In another middleware');
   res.send('<h1>Hello from Express.js</h1>')
});

app.listen(3000);