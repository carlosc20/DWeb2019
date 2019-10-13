const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer(function (req, res) {
    var id = req.url.substr(1)
    console.log("Recebido: " + req.method + ' ' + id)


    if(id === "arq2html.xsl") {
        fs.readFile("arq2html.xsl", function(err, data){
            if(err) {
                console.log("Erro")
                res.writeHead(404, {'Content-Type': 'text/text'})
                res.end("Not found")   
            }
            else{
                console.log("Resposta com arq2html.xsl")
                res.writeHead(200, {'Content-Type': 'text/xsl'})
                res.write(data)
                res.end()
            }
        })  
    } else {
        fs.readFile("dataset/arq" + id + ".xml", function(err, data){
            if(err) {
                console.log("Erro")
                res.writeHead(404, {'Content-Type': 'text/text'})
                res.end("Not found")    
            }
            else {
                console.log("Resposta com dataset/arq" + id)
                res.writeHead(200, {'Content-Type': 'text/xml; charset=utf-8'})
                res.write(data)
                res.end()
            }
        })
    }
    
}).listen(7777)
console.log('Servidor à escuta na porta 7777...')