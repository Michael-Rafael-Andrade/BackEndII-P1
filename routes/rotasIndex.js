var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex');
const { Produto, Categoria, Usuario } = require('../model/modelos');



// Página Principal (Sem cache)
router.get('/', async function(req, res, next) {
  try {
    // Proibir armazenamento em cache intermediário ou navegador 
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    const produtos = await Produto.findAll({
      include: [{ model: Categoria, as: 'categoria' }]
    });

    res.render('index', { title: 'ElectroStore - Home', produtos });
  } catch (error) {
    next(error);
  }
});

// Página Nossa História (Cache de 10 meses = 25920000 segundos)
router.get('/historia', function(req, res, next) {
  res.set('Cache-Control', 'public, max-age=25920000, must-revalidate');
  res.render('historia', { title: 'Nossa História - ElectroStore' });
});




module.exports = router;
