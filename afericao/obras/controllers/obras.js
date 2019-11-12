var Obra = require('../models/obra')
var mongoose = require('mongoose');

module.exports.listar = () =>{
    return Obra
            .find()
            .exec()
}

module.exports.consultar = id =>{
    return Obra
            .findOne({_id: id})
            .exec()
}

module.exports.listarPorAno = ano =>{
    return Obra
            .find({anoCriacao: ano})
            .exec()
}

module.exports.listarPorCompositorDuracao = (c,d) =>{
    return Obra
            .find({compositor: c, duracao: {$gte: d}})
            .exec()
}

module.exports.listarPorPeriodo = p =>{
    return Obra
            .find({periodo: p})
            .exec()
}

module.exports.listarCompositores = () =>{
    return Obra
            .find({periodo: p})
            .exec()
}

module.exports.listarCompositores = () =>{
    return Obra
            .distinct('compositor')
            .exec()
}

module.exports.listarPeriodos = () =>{
    return Obra
            .distinct('periodo')
            .exec()
}