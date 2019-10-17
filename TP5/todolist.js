var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')
var jsonfile = require('jsonfile')

var {parse} = require('querystring')

var myDB = "tarefas.json"

var myServer = http.createServer((req,res) => {
    var purl = url.parse(req.url, true)
    var query = purl.query

    console.log(req.method + ' ' + purl.pathname)

    if(req.method == 'GET'){
        if(purl.pathname == '/') {
            jsonfile.readFile(myDB, (erro, tarefas) => {
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                if(erro){
                    console.log("erro")
                    res.write(pug.renderFile('erro.pug', {e:erro}))
                    res.end()
                    return
                }
                console.log("bom")
                res.write(pug.renderFile('index.pug', {lista: tarefas}))
                res.end()
            })
        }
        else if(purl.pathname == '/w3.css'){
            fs.readFile('stylesheets/w3.css',(erro,data) => {
                if(erro){
                    console.log("erro")
                    res.write(pug.renderFile('erro.pug', {e:erro}))
                    res.end()
                    return
                }
                console.log("bom")
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.write(data)
                res.end()
            })      
        }
    } 
    else if(req.method == 'POST') {
        if(purl.pathname == '/tarefa'){
            recuperaInfo(req, resultado=>{
                jsonfile.readFile(myDB, (erro, tarefas)=>{
                    if(!erro){
                        tarefas.push(resultado)
                        jsonfile.writeFile(myDB, tarefas, erro =>{
                            if(erro)
                                console.log(erro)
                            else {
                                res.writeHead(303, {'Location': '/'})
                                res.end()
                                console.log("registo gravado com sucesso")
                            }
                        })
                    }
                })
            })
        }
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        console.log("ERRO: " + req.method + " não suportado...")
        res.write(pug.renderFile('erro.pug', {e: "ERRO: " + req.method + " não suportado..."}))
        res.end()
    }
})

myServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})

function recuperaInfo(request, callback) {
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            callback(parse(body))
        })
    }
}