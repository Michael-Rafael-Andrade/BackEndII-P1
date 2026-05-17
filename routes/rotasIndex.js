var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex');

// Rota para a página principal (Catálogo de Produtos)
router.get('/', controllerIndex.tela_principal);

module.exports = router;
