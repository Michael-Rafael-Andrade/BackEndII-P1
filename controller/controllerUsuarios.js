const { Produto, Categoria, Usuario } = require('../model/modelos');
// Importando o criptografador e o modelo de Usuário
const bcrypt = require('bcrypt');

// Função que entrega a tela de cadastro
exports.cadastro_get = function (req, res) {
    const contexto = {
        titulo_pagina: 'Cadastro de Usuário'
    };
    return res.render('cadastro', contexto);
};

// Função que entrega a tela de login
exports.login_get = function (req, res) {
    const contexto = {
        titulo_pagina: 'Login'
    };
    return res.render('login', contexto);
};


exports.cadastro_post = async function (req, res) {
    try {
        // Pegamos os dados que vieram do formulário (req.body)
        const { nome, email, senha, confirmacao_senha } = req.body;

        const erros = [];

        // Validações
        if (senha !== confirmacao_senha) {
            erros.push({ msg: 'Confirmação de senha não confere' });
        }

        if (senha.length < 6) {
            erros.push({ msg: 'A senha deve ter no mínimo 6 caracteres' });
        }

        // Verifica se o e-mail já está cadastrado no banco
        const usuarioExistente = await Usuario.findOne({ where: { email: email } });
        if (usuarioExistente) {
            erros.push({ msg: 'Já existe um usuário cadastrado com este e-mail' });
        }

        // Se houver algum erro, devolvemos a tela de cadastro com as mensagens
        if (erros.length > 0) {
            return res.render('cadastro', {
                titulo_pagina: 'Cadastro de Usuário',
                erros: erros,
                // Devolvemos o que ele digitou para ele não ter que digitar tudo de novo
                old: { nome, email }
            });
        }

        //  Embaralhando (Hash) a senha com bcrypt (10 rounds de complexidade)
        const senha_hash = await bcrypt.hash(senha, 10);

        //  Salvando o novo usuário no Banco de Dados (Sequelize)
        await Usuario.create({
            nome: nome,
            email: email,
            senha_hash: senha_hash,
            perfil: 'usuario' // Todo novo cadastro pelo site ganha o perfil comum
        });

        // Redireciona o usuário para a tela de login
        return res.redirect('/usuarios/login');

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).send('Erro interno ao tentar cadastrar usuário.');
    }
};

// Função para fazer o logout
exports.logout = function (req, res, next) {
    // O Passport.js a partir da versão 0.6 exige que o logout receba uma função de callback (erro)
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // Após destruir a sessão, redireciona o usuário para a página inicial
        res.redirect('/');
    });
};

