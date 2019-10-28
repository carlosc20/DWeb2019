var express = require('express')
var router = express.Router()

var jsonfile = require('jsonfile')
var nanoid = require('nanoid')

var arqson = "arq.json"

/* GET home page. */
router.get('/', function(req, res, next) {
    jsonfile.readFile(arqson, (err, arq) => {
        if(err){
            res.render('error', {message: "Erro na leitura da BD", error: err})
            return
        }
        arq.sort((a, b) => a.tit > b.tit ? 1 : (a.tit < b.tit ? -1 : 0))
        res.render('index', { lista: arq })
    })
});

router.get('/novo', function(req, res, next) {
    res.render('new-music')
});

router.get('/editar/:id', function(req, res, next) {
    var id = req.params.id
    jsonfile.readFile(arqson, (err, arq) => {
        if(err){
            res.render('error', {message: "Erro na leitura da BD", error: err})
            return
        }
        var music = arq.find(m => m.id == id)
        if(music != undefined){
            res.render('edit-music', {m: music})
        }
        else {
            console.log('Erro: não encontrei o elemento a remover...')
        }
    })
});

router.post('/', function (req, res) {
    jsonfile.readFile(arqson, (err, arq) => {
        if(err){
            res.render('new-music')
            return
        }
        req.body.id = nanoid()
        arq.push(req.body)
        jsonfile.writeFile(arqson, arq, { spaces: 2 },  err => {
            if(err)
                res.render('new-music')
            else{
                arq.sort((a, b) => a.tit > b.tit ? 1 : (a.tit < b.tit ? -1 : 0))
                res.render('index', { lista: arq })
            }
        })
    })
})

router.delete('/:id', function (req, res) {
    var id = req.params.id
    jsonfile.readFile(arqson, (err, arq) => {
        if(err){
            res.render('error', {message: "Erro na leitura da BD", error: err})
            return
        }
        var index = arq.findIndex(m => m.id == id)
        if(index > -1){
            arq.splice(index,1)
            jsonfile.writeFile(arqson, arq, { spaces: 2 }, err =>{
                if(err) console.log(err)
                else console.log('BD atualizada')
            })
        }
        else {
            console.log('Erro: não encontrei o elemento a remover...')
        }
        res.end('0')
    })
})

router.put('/:id', function (req, res) {
    var id = req.params.id
    jsonfile.readFile(arqson, (err, arq) => {
        if(err){
            res.render('error', {message: "Erro na leitura da BD", error: err})
            return
        }
        var index = arq.findIndex(m => m.id == id)
        if(index > -1){
            arq.splice(index,1)
            arq.push(req.body)
            jsonfile.writeFile(arqson, arq, { spaces: 2 }, err => {
                if(err) console.log(err)
                else console.log('BD atualizada')
                arq.sort((a, b) => a.tit > b.tit ? 1 : (a.tit < b.tit ? -1 : 0))
                res.render('index', { lista: arq })
            })
        }
        else {
            console.log('Erro: não encontrei o elemento a remover...')
        }
        res.end('0')
    })
})

module.exports = router;