const { Produto, Categoria } = require('../model/modelos.js');

exports.tela_principal = async function (req, res) {
    try {
        // Busca todas as categorias para montar os botões de filtro
        const categorias = await Categoria.findAll();

        // Busca os produtos. O 'include' serve para trazer os dados da Categoria junto (JOIN)
        const produtos = await Produto.findAll({
            include: [{
                model: Categoria,
                as: 'categoria', // Este nome deve bater com a associação feita no modelos.js
                attributes: ['nome']
            }]
        });

        // Monta a "caixa de dados" (contexto) que será enviada para o HTML
        const contexto = {
            titulo_pagina: "Catálogo de Produtos",
            categorias: categorias,
            produtos: produtos,
        };

        // Manda a tela 'index.hbs' ser desenhada usando o contexto
        return res.render('index', contexto);

    } catch (error) {
        console.error('Erro ao carregar a página inicial:', error);
        return res.status(500).send('Erro interno ao tentar listar os produtos da ElectroStore.');
    }
}