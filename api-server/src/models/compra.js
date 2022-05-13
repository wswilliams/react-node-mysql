const Sequelize = require('sequelize')
const sequelize = require('../database/database.js')

const Compra = sequelize.define("compra", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  total: {
    allowNull: false,
    type: Sequelize.DOUBLE(),
    validate: {
      len: [1, 999999]
    }
  },
  data_criacao: {
    allowNull: false,
    type: Sequelize.DATE()
  },
  tipo_pagamento: {
    allowNull: false,
    type: Sequelize.STRING(100),
    validate: {
      len: [3, 100]
    }
  },
   status: {
    allowNull: false,
    type: Sequelize.STRING(50),
    validate: {
      len: [3, 50]
    }
  }

}, {
  
  timestamps: false,
  createdAt: false,
  updatedAt: false

})

module.exports = Compra
