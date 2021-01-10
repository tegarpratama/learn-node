const express = require('express');
const app = express();

app.use('/users', (req, res, next) => {
   console.log('/users');
   res.send('<h1>Users Page</h1>')
});

app.use('/', (req, res, next) => {
   console.log('/');
   res.send('<h1>Main Page</h1>')
});

app.listen(3000);