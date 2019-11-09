var express = require('express');
var router = express.Router();
var Premios = require('../controllers/premios');

router.get('/premios', function(req, res) {
    let categoria = req.query.categoria
    let data = req.query.data

    if(data && categoria) {
        Premios.listarPorCategoriaData(categoria, data)
                .then(dados => res.jsonp(dados))
                .catch(error => res.status(500).jsonp(error))   
    }
    else if(categoria) {
        Premios.listarPorCategoria(categoria)
                .then(dados => res.jsonp(dados))
                .catch(error => res.status(500).jsonp(error)) 
    }
    else {
        Premios.listar()
                .then(dados => res.jsonp(dados))
                .catch(error => res.status(500).jsonp(error))
    }
});

router.get('/premios/:id', function(req, res) {
    Premios.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/categorias', function(req, res){
    Premios.listarCategorias()
            .then(dados => res.jsonp(dados))
            .catch(error => res.status(500).jsonp(error))
})

router.get('/laureados', function(req, res){
    Premios.listarLaureados()
            .then(dados => res.jsonp(dados))
            .catch(error => res.status(500).jsonp(error))
})

module.exports = router;
