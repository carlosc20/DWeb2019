"use strict";
var Obra = require('../models/obra');

module.exports.getAll = () => {
    return Obra
        .find()
        .select({id:1, titulo:1, tipo:1, compositor:1, _id:0})
        .exec()
}

module.exports.getById = id =>{
    return Obra
        .findOne({id: id})
        .exec()
}

module.exports.getTipos = () =>{
    return Obra
        .distinct('tipo')
        .exec()
}

module.exports.getByCompositor = compositor =>{
    return Obra
        .find({compositor: compositor})
        .exec()
}

module.exports.getWithInstrumento = instrumento =>{
    return Obra
        .find({"instrumentos.designacao": instrumento})
        .exec()
}

module.exports.getAllQuant = () =>{
    return Obra
        .aggregate([
            {$unwind : "$instrumentos"},
            {$group: {
                _id: "$id",
                partituras: {$sum: 1},
                titulo: {$first: "$titulo"}
            }},
            {$project: {titulo:1, id:"$_id", _id:0, partituras:1}}
        ])
}