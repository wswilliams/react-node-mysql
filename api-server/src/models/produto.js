const Sequelize = require('sequelize')
const sequelize = require('../database/database.js')

const Produto = sequelize.define("produto", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nome: {
    allowNull: false,
    type: Sequelize.STRING(100),
    validate: {
      len: [3, 100]
    }
  },
  descricao: {
    allowNull: false,
    type: Sequelize.STRING(200),
    validate: {
      len: [3, 200]
    }
  },
  preco: {
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
  data_atualizacao: {
    allowNull: true,
    type: Sequelize.DATE()
  }
}, {
  
  timestamps: false,
  createdAt: false,
  updatedAt: false

})

module.exports = Produto
