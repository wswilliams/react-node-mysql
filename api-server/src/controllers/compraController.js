const Compra = require('../models/compra')
const CompraProduto = require('../models/compra_produto')
const Produto = require('../models/produto')
const status = require('http-status')
const moment = require('moment')
const { QueryTypes } = require('sequelize');

// Insert
exports.Insert = (req, res, next) => {
  const total = req.body.total
  const data_criacao = moment().format();
  const tipo_pagamento = req.body.tipo_pagamento
  const STATUS = req.body.status
  const produtos = req.body.produtos

  if(produtos.length == 0){
    res.status(status.NOT_FOUND).send()
  }
  Compra.create({
    total: total,
    data_criacao: data_criacao,
    tipo_pagamento: tipo_pagamento,
    status: STATUS
  })
  .then(compra => {
    if(compra) {
      let count = 0;
      for (let value of produtos) {
          CompraProduto.create({
            id_compra: compra.id,
            id_produto: value,
          }).then(compraProduto => {
            console.log(compraProduto)
          })
          count ++;

          if(count == produtos.length)
            res.status(status.OK).send(compra)
      }

    } else {
      res.status(status.NOT_FOUND).send()
    }
  })
  .catch(error => next(error))
}

// Select
exports.SearchAll = (req, res, next) => {
  Compra.findAll()
  .then(compra => {
    if(compra) {
      res.status(status.OK).send(compra)
    }
  })
  .catch(error => next(error))
}

// Select por ID
exports.SearchOne = async (req, res, next) => {

  const id = req.params.id

  const result = await Compra.sequelize.query(`SELECT * FROM compras where id = ${id}`, { type: QueryTypes.SELECT });
  if(!result)
    res.status(status.NOT_FOUND).send()

  const compraProduto = await CompraProduto.sequelize.query(`SELECT * FROM compra_produtos where id_compra = ${id}`, { type: QueryTypes.SELECT });

  let compras ={
    compra: result[0],
    produtos: []
  }

  // recupera os produtos por ID
  let count = 0;
    for (let value of compraProduto) {

      const produto = await Produto.sequelize.query(`SELECT * FROM produtos where id = ${value.id_produto}`, { type: QueryTypes.SELECT });
      compras.produtos.push(produto[0])

        if(count == compraProduto.length)
          break

      count ++;
    }
    res.status(status.OK).send(compras)
}

// Update
exports.Update = (req, res, next) => {
  const id = req.params.id
  const total = req.body.total
  const tipo_pagamento = req.body.tipo_pagamento
  const STATUS = req.body.status
  const produtos = req.body.produtos

  Compra.findByPk(id)
  .then(compra => {
    if(compra) {
      compra.update({
        total: total,
        tipo_pagamento: tipo_pagamento,
        status: STATUS
      },
      {
        where: { id: id }
      })
      .then(() => {

        //remove os idem da tabela de relacionamento 
        CompraProduto.destroy({
          where: {id_compra: id}
        })
        .then(() => {

          //inseri os idem da tabela de relacionamento 
          let count = 0;
          for (let value of produtos) {
              CompraProduto.create({
                id_compra: compra.id,
                id_produto: value,
              }).then(compraProduto => {
              })
              count ++;
  
              if(count == produtos.length)
                res.status(status.OK).send(compra)
          }
        })
      })
      .catch(error => next(error))
    } else {
      res.status(status.NOT_FOUND).send()
    }
  })
  .catch(error => next(error))
}

// Delete
exports.Delete = (req, res, next) => {
  const id = req.params.id
  Compra.findByPk(id)
  .then(compra => {
    if (compra) {
      compra.destroy({
        where: {id: id}
      })
      .then(() => {
        CompraProduto.destroy({
          where: {id_compra: id}
        })
        .then(() => {
          res.status(status.OK).send()
        })
      })
      .catch(error => next(error))
    } else {
      res.status(status.NOT_FOUND).send()
    }
  })
  .catch(error => next(error))
}
