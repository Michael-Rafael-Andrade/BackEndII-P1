
const controllerProdutos = require('../controller/controllerProdutos');
const { Produto, Categoria } = require('../model/modelos');
// const passport = require('passport');



// Entrega a tela de cadastro
exports.cadastro_get = async function (req, res) {
    // Bloqueia quem não está logado ou não é admin/lojista
    if (!req.user || (req.user.perfil !== 'admin' && req.user.perfil !== 'lojista')) {
        return res.status(403).send('Acesso negado. Apenas administradores e lojistas podem cadastrar produtos.');
    }

    try {
        // Busca as categorias no banco para preencher o <select> do formulário
        const categorias = await Categoria.findAll();
        
        const contexto = {
            titulo_pagina: 'Cadastrar Novo Produto',
            categorias: categorias
        };
        
        return res.render('produto_cadastro', contexto);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao carregar a página de cadastro.');
    }
};

// Recebe os dados e salva no banco
exports.cadastro_post = async function (req, res) {
    // Segurança dupla: verifica novamente no POST
    if (!req.user || (req.user.perfil !== 'admin' && req.user.perfil !== 'lojista')) {
        return res.status(403).send('Acesso negado.');
    }

    try {
        const { nome, preco, descricao, quantidade, status, categoria_id } = req.body;

        // Cria o produto e vincula automaticamente ao usuário logado (req.user.id)
        await Produto.create({
            nome: nome,
            preco: preco,
            descricao: descricao,
            quantidade: quantidade,
            status: status,
            categoria_id: categoria_id,
            usuario_id: req.user.id // Pegando o ID da sessão!
        });

        // Redireciona para a página inicial após o sucesso
        return res.redirect('/');
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        return res.status(500).send('Erro interno ao tentar salvar o produto.');
    }
};