var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/', function(req, res, next) {
    Filmes.listar()
    .then(dados => res.render('index', { lista: dados }) )
    .catch(erro => res.render('error', { message: "Erro na leitura da BD"}))
});

router.get('/novoFilme', function(req, res, next) {
    res.render('novo')
});

router.get('/editarFilme/:idFilme', function(req, res, next) {
    Filmes.consultar(req.params.idFilme)
    .then(dados => res.render('edit', { dados }))
    .catch(erro => res.render('error', { message: "Erro na leitura da BD"}))
});

router.get('/:idFilme', function(req, res, next) {
    Filmes.consultar(req.params.idFilme)
    .then(dados => res.render('filme', { f: dados }))
    .catch(erro => res.render('error', { message: "Erro na leitura da BD"}))
});

router.get('/*', function(req, res, next) {
    res.render('error', {error: "Pedido não suportado"})
});


//POST
router.post('/', function(req, res, next) {
    Filmes.adicionar(req.body)
    .then(res.redirect('/filmes'))
    .catch(erro => res.render('error', { message: "Erro"}))
});

router.post('/*', function(req, res, next) {
    res.render('error', {error: "Pedido não suportado"})
});


//DELETE
router.delete('/:idFilme', function(req, res, next) {
    Filmes.apagar(req.params.idFilme)
    .then(dados => {console.log(dados); res.jsonp(dados)})
    .catch(erro => res.render('error.stack', { message: "Erro"}))
});

router.delete('/*', function(req, res, next) {
    res.render('error', {error: "Pedido não suportado"})
});

//PUT
router.put('/:idFilme', function(req, res, next) {
    Filmes.modificar(req.params.idFilme, req.body)
    .then(dados => {console.log(dados); res.jsonp(dados)})
    .catch(erro => res.render('error', { message: "Erro"}))
});

router.put('/*', function(req, res, next) {
    res.render('error', {error: "Pedido não suportado"})
});

module.exports = router;