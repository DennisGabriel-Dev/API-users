const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users-db', 'dennisgabs', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});


module.exports = sequelize;