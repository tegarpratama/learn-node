const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-shop', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
