var express = require('express');
var router = express.Router();
const passport = require('passport');
const controllerUsuarios = require('../controller/controllerUsuarios');

// Rota para mostrar a tela de cadastro
router.get('/cadastro', controllerUsuarios.cadastro_get);

// Rota para receber os dados e salvar no banco (POST) 
router.post('/cadastro', controllerUsuarios.cadastro_post);


// Rota para MOSTRAR a tela de login (GET)
router.get('/login', controllerUsuarios.login_get);



// Rota para PROCESSAR o login (POST)
// O Passport intercepta os dados e faz aquela validação que configuramos no app.js
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Se acertar, vai para a página inicial
    failureRedirect: '/usuarios/login', // Se errar, volta para o login
    // failureFlash: true // (Opcional) Usado se mostrar mensagens de erro dinâmicas 
}));

// Rota para realizar o logout (GET)
router.get('/logout', controllerUsuarios.logout);

module.exports = router;