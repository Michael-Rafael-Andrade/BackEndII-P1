// Função que entrega a tela de cadastro
exports.cadastro_get = function(req, res) {
    const contexto = {
        titulo_pagina: 'Cadastro de Usuário'
    };
    return res.render('cadastro', contexto);
};

// Função que entrega a tela de login
exports.login_get = function(req, res) {
    const contexto = {
        titulo_pagina: 'Login'
    };
    return res.render('login', contexto);
};

