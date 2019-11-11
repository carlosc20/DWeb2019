var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/categorias', function(req, res, next) {
  axios.get('http://localhost:3000/api/categorias')
    .then(dados =>{
      res.render('categorias', {lista: dados.data})
    })
    .catch(erro =>{
      res.render('error', {error: erro})
    })
});

router.get('/laureados', function(req, res, next) {
  axios.get('http://localhost:3000/api/laureados')
  .then(dados =>{
    res.render('laureados', {lista: dados.data})
  })
  .catch(erro =>{
    res.render('error', {error: erro})
  })
});

router.get('/premios', function(req, res, next) {
  let path = 'http://localhost:3000/api/premios';

  let categoria = req.query.categoria
  let data = req.query.data

  if(categoria || data) {
    path += '?categoria=' + categoria + '&data=' + data
  }

  axios.get(path)
    .then(dados =>{
      res.render('premios', {lista: dados.data})
    })
    .catch(erro =>{
      res.render('error', {error: erro})
    })
});

router.get('/premios/:id', function(req, res) {
  axios.get('http://localhost:3000/api/premios/' + req.params.id)
    .then(dados =>{
      res.render('detalhes-premio', {premio: dados.data})
    })
    .catch(erro =>{
      res.render('error', {error: erro})
    })
})

router.get('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});

module.exports = router;
