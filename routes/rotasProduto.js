var express = require('express');
var router = express.Router();
const controllerProdutos = require('../controller/controllerProdutos');
const { Produto, Categoria, Usuario } = require('../model/modelos');

// Rota para MOSTRAR o formulário (GET)
router.get('/cadastro', controllerProdutos.cadastro_get);

// Rota para PROCESSAR e SALVAR o formulário (POST)
router.post('/cadastro', controllerProdutos.cadastro_post);


// // Middleware para proteger rotas por perfil
// function verificarPerfil(perfilExigido) {
//   return function(req, res, next) {
//     if (req.isAuthenticated() && req.user.perfil === perfilExigido) {
//       return next();
//     }
//     res.status(403).send('Mensagem para acesso a funcionalidade sem o perfil adequado.');
//   };
// }

// // GET - Tela de Cadastro de Produto (Cache de 2 meses = 5184000 segundos)
// router.get('/cadastro', verificarPerfil('admin'), async function(req, res, next) {
//   try {
//     res.set('Cache-Control', 'private, max-age=5184000, must-revalidate');
//     const categorias = await Categoria.findAll();
//     res.render('produtos/cadastro', { title: 'Cadastrar Produto', categorias });
//   } catch (error) {
//     next(error);
//   }
// });

// // POST - Executar Cadastro do Produto
// router.post('/cadastro', verificarPerfil('admin'), async function(req, res, next) {
//   try {
//     const { nome, descricao, preco, quantidade, status, categoria_id } = req.body;
    
//     // Vinculo automático/invisível do utilizador logado (Sem select na view)
//     await Produto.create({
//       nome, descricao, preco, quantidade, status,
//       categoria_id,
//       usuario_id: req.user.id 
//     });

//     res.redirect('/');
//   } catch (error) {
//     next(error);
//   }
// });

// // GET - Consulta Detalhada do Produto (Sem cache)
// router.get('/:id', async function(req, res, next) {
//   try {
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//     const produto = await Produto.findByPk(req.params.id, {
//       include: [{ model: Categoria, as: 'categoria' }]
//     });

//     // IMPORTANTE: Não injetar ou enviar o utilizador associado para esta view!
//     res.render('produtos/detalhes', { title: 'Detalhes do Produto', produto });
//   } catch (error) {
//     next(error);
//   }
// });

// // POST - Registrar Venda (-1 no estoque)
// router.post('/venda/:id', verificarPerfil('lojista'), async function(req, res, next) {
//   try {
//     const produto = await Produto.findByPk(req.params.id);
//     if (produto && produto.quantidade > 0) {
//       produto.quantidade -= 1;
//       await produto.save();
//     }
//     res.redirect('/');
//   } catch (error) {
//     next(error);
//   }
// });

// // POST - Registrar Compra (+1 no estoque)
// router.post('/compra/:id', verificarPerfil('lojista'), async function(req, res, next) {
//   try {
//     const produto = await Produto.findByPk(req.params.id);
//     if (produto) {
//       produto.quantidade += 1;
//       await produto.save();
//     }
//     res.redirect('/');
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;