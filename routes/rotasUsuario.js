var express = require('express');
var router = express.Router();
const controllerUsuarios = require('../controller/controllerUsuarios');

// Rota para mostrar a tela de cadastro
router.get('/cadastro', controllerUsuarios.cadastro_get);

// Rota para mostrar a tela de login
router.get('/login', controllerUsuarios.login_get);

module.exports = router;