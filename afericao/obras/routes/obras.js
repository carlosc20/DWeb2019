var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras');

router.get('/', function(req, res) {
  let ano = req.query.ano
  let compositor = req.query.compositor
  let duracao = req.query.duracao
  let periodo = req.query.periodo

  if(ano) {
    Obras.listarPorAno(ano)
              .then(dados => res.jsonp(dados))
              .catch(error => res.status(500).jsonp(error))   
  }
  else if(compositor && duracao) {
    Obras.listarPorCompositorDuracao(compositor, duracao)
              .then(dados => res.jsonp(dados))
              .catch(error => res.status(500).jsonp(error)) 
  }
  else if(periodo) {
    Obras.listarPorPeriodo(periodo)
            .then(dados => res.jsonp(dados))
            .catch(error => res.status(500).jsonp(error)) 
}
  else {
    Obras.listar()
              .then(dados => res.jsonp(dados))
              .catch(error => res.status(500).jsonp(error))
  }
});

router.get('/:id', function(req, res) {
  Obras.consultar(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).jsonp(error))
});


module.exports = router;
