var express = require('express');
var router = express.Router();
const { Produto, Categoria, Usuario } = require('../model/modelos.js');

exports.tela_principal = async function (req, res) {
    try {
        // Busca todos os produtos e inclui os dados da categoria e do usuário responsável
        const produtos = await Produto.findAll({
            include: [
                { model: Categoria, as: 'categoria' },
                { model: Usuario, as: 'usuario' }
            ]
        });



        const contexto = {
            titulo_pagina: "ElectroStore - Página Inicial",
            produtos: produtos,

        };

        return res.render('index', contexto);

    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        return res.status(500).send('Erro interno ao carregar a página inicial.');
    }
};