const Produto = require('../models/produto')
const status = require('http-status')
const moment = require('moment')

// Insert
exports.Insert = (req, res, next) => {
  const nome = req.body.nome
  const descricao = req.body.descricao;
  const preco = req.body.preco
  const data_criacao = moment().format();

  console.log("req.body ",req.body)
  

  Produto.create({
    nome: nome,
    descricao: descricao,
    preco: preco,
    data_criacao: data_criacao
  })
  .then(produto => {
    if(produto) {
      res.status(status.OK).send(produto)
    } else {
      res.status(status.NOT_FOUND).send()
    }
  })
  .catch(error => next(error))
}

// Select
exports.SearchAll = (req, res, next) => {
  Produto.findAll()
  .then(produto => {
    if(produto) {
      res.status(status.OK).send(produto)
    }
  })
  .catch(error => next(error))
}

// Select por ID
exports.SearchOne = (req, res, next) => {
  const id = req.params.id
  Produto.findByPk(id)
  .then(produto => {
    if(produto) {
      res.status(status.OK).send(produto)
    } else {
      res.status(status.NOT_FOUND).send()
    }
  })
  .catch(error => next(error))
}

// Update
exports.Update = (req, res, next) => {
  const id = req.params.id
  const nome = req.body.nome
  const descricao = req.body.descricao;
  const preco = req.body.preco
  const data_atualizacao = moment().format();
  

  Produto.findByPk(id)
  .then(produto => {
    if(produto) {
      produto.update({
        nome: nome,
        descricao: descricao,
        preco: preco,
        data_atualizacao: data_atualizacao
      },
      {
        where: { id: id }
      })
      .then(() => {
        res.status(status.OK).send()
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
  Produto.findByPk(id)
  .then(produto => {
    if (produto) {
      produto.destroy({
        where: {id: id}
      })
      .then(() => {
        res.status(status.OK).send()
      })
      .catch(error => next(error))
    } else {
      res.status(status.NOT_FOUND).send()
    }
  })
  .catch(error => next(error))
}
