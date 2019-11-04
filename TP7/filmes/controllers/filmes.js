var Filme = require('../models/filme')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const Filmes = module.exports

Filmes.listar = () =>{
    return Filme
            .find()
            .sort({title:1})
            .exec()
}


Filmes.consultar = id =>{
    return Filme
            .findOne({_id: id})
            .exec()
}


Filmes.apagar = id =>{
    return Filme
            .findOneAndDelete({_id: ObjectId(id)})
            .exec()
}

Filmes.adicionar = dados =>{
    var filme = new Filme(dados)
    return filme.save()
}

Filme.modificar = (id,dados) => {
        return Filme.findOneAndUpdate({_id: ObjectId(id)}, dados)
        .exec()
}