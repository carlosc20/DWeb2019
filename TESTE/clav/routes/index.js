var express = require('express');
var router = express.Router();
var axios = require('axios');

var apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ';

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey=' + apikey)
  .then(dados =>{
    res.render('inicial', {lista: dados.data})
  })
  .catch(erro =>res.render('error', {error: erro}))
});

router.get('/entidades/:id', function(req, res, next) {
  Promise.all([
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '?apikey=' + apikey),
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono?apikey=' + apikey),
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante?apikey=' + apikey),
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey=' + apikey)
  ])
  .then(([entidade, dono, participante, tipologias]) => {
    res.render('entidade', {e: entidade.data, dono: dono.data, participante: participante.data, tipologias: tipologias.data, apikey});
  })
  .catch(erro => res.render('error', {error: erro}));
});


router.get('/tipologias/:id', function(req, res, next) {
  Promise.all([
    axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '?apikey=' + apikey), 
    axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '/elementos?apikey=' + apikey),
    axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '/intervencao/dono?apikey=' + apikey),
    axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + req.params.id + '/intervencao/participante?apikey=' + apikey)
  ])
  .then(([tipologia, elementos, dono, participante]) => {
    res.render('tipologia', {t: tipologia.data, elementos: elementos.data, dono: dono.data, participante: participante.data});
  })
  .catch(erro => res.render('error', {error: erro}));
});


module.exports = router;
