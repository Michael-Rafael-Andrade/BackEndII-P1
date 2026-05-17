var express = require('express');
var router = express.Router();
const { Produto, Categoria, Usuario } = require('../model/modelos.js');
// const passport = require('passport');


// Página Principal (Sem cache conforme requisito)
exports.tela_principal = async function (req, res, next) {
    try {
        // Proibir armazenamento em cache intermediário ou navegador
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

        const produtos = await Produto.findAll({
            include: [{ model: Categoria, as: 'categoria' }]
        });

        res.render('index', { titulo_pagina: 'ElectroStore - Início', produtos });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        return res.status(500).send('Erro interno ao carregar a página inicial.');
    }
};

// Página Nossa História (Cache público de 10 meses = 25920000 segundos)
exports.historia = function (req, res) {
    // Define o cabeçalho de cache público com duração de 10 meses
    res.set('Cache-Control', 'public, max-age=25920000, must-revalidate');

    res.render('historia', {
        title: 'Nossa História - ElectroStore',
        titulo_pagina: 'Nossa História - ElectroStore'
    });
};
