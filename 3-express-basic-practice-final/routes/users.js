const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
const router = express.Router();

router.get('/add-user', (req, res, next) => {
   res.sendFile(path.join(rootDir, 'views', 'add-users.html'));
});

router.post('/add-user', (req, res, next) => {
   console.log(req.body);
   res.redirect('/');
});

module.exports = router;