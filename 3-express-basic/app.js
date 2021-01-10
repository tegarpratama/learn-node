const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
   console.log('This always run');
   next();
});

app.use('/add-product', (req, res, next) => {
   console.log('add product');
   res.send('<h1>The "Add Product" Page</h1>')
});

app.use('/', (req, res, next) => {
   console.log('/');
   res.send('<h1>Hello from Express.js</h1>')
});

app.listen(3000);