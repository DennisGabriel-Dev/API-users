const Sequelize = require('sequelize')
const db = require('./db')

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: null
  },
  tipo: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = User