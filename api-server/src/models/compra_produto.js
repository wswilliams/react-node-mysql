const Sequelize = require('sequelize')
const sequelize = require('../database/database.js')

const Compra_Produto = sequelize.define("compra_produto", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  id_compra: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  id_produto: {
    allowNull: false,
    type: Sequelize.INTEGER
  }

}, {

  timestamps: false,
  createdAt: false,
  updatedAt: false

})

module.exports = Compra_Produto
