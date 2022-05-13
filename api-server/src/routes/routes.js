const express = require('express')
const router = express.Router()
const CompraController = require('../controllers/compraController')
const ProdutoController = require('../controllers/produtoController')

router.post('/compras', CompraController.Insert)
router.get('/compras', CompraController.SearchAll)
router.get('/compras/:id', CompraController.SearchOne)
router.put('/compras/:id', CompraController.Update)
router.delete('/compras/:id', CompraController.Delete)

router.post('/produtos', ProdutoController.Insert)
router.get('/produtos', ProdutoController.SearchAll)
router.get('/produtos/:id', ProdutoController.SearchOne)
router.put('/produtos/:id', ProdutoController.Update)
router.delete('/produtos/:id', ProdutoController.Delete)

module.exports = router
