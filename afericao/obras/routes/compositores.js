var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras');

router.get('/', function(req, res) {
    Obras.listarCompositores()
            .then(dados => res.jsonp(dados))
            .catch(error => res.status(500).jsonp(error))
});

module.exports = router;