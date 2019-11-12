var express = require('express');
var router = express.Router();
var axios = require('axios');

var apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ'

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey=' + apikey)
  .then(dados =>{
    res.render('entidades', {lista: dados.data})
  })
  .catch(erro =>{
    res.render('error', {error: erro})
  })
});

router.get('/:id', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '?apikey=' + apikey)
  .then(entidade =>{
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono?apikey=' + apikey)
    .then(dono =>{
      axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante?apikey=' + apikey)
      .then(participante =>{
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey=' + apikey)
        .then(tipologias =>{
          res.render('entidade', {e: entidade.data, dono: dono.data, participante: participante.data, tipologias: tipologias.data})
        })
        .catch(erro =>{
          res.render('error', {error: erro})
        })
      })
      .catch(erro =>{
        res.render('error', {error: erro})
      })
    })
    .catch(erro =>{
      res.render('error', {error: erro})
    })
  })
  .catch(erro =>{
    res.render('error', {error: erro})
  })
});



module.exports = router;
