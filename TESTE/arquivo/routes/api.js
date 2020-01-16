var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras');


router.get('/obras', function(req, res, next) {
  let compositor = req.query.compositor;
  let instrumento = req.query.instrumento;

  if(compositor) {
    Obras.getByCompositor(compositor)
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).jsonp(error));
  }
  else if(instrumento) {
    Obras.getWithInstrumento(instrumento)
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).jsonp(error));
  }
  else {
    Obras.getAll()
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).jsonp(error));
  }
});

router.get('/obras/:id', function(req, res, next) {
  Obras.getById(req.params.id)
    .then(dados => { res.jsonp(dados) })
    .catch(erro => { res.status(500).jsonp(erro) });
});


router.get('/tipos', function(req, res, next) {
  Obras.getTipos()
    .then(dados => { res.jsonp(dados) })
    .catch(erro => { res.status(500).jsonp(erro) });
});

router.get('/obrasQuant', function(req, res, next) {
  Obras.getAllQuant()
    .then(dados => { res.jsonp(dados) })
    .catch(erro => { res.status(500).jsonp(erro) });
});

module.exports = router;