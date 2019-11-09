var Prize = require('../models/premios')
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

// apenas ano e categoria
module.exports.listar = () =>{
    return Prize
            .find()
            .select({year:1, category:1})
            .exec()
}

module.exports.consultar = id =>{
    return Prize
            .findOne({_id: ObjectId(id)})
            .exec()
}

module.exports.listarCategorias = () =>{
    return Prize
            .distinct('category')
            .exec()
}

module.exports.listarPorCategoria = categoria =>{
    return Prize
            .find({category: categoria})
            .exec()
}

// data superior á indicada
module.exports.listarPorCategoriaData = (categoria, data) =>{
    return Prize
            .find({year: {$gt: data}, category: categoria})
            .exec()
}

// ordenada alfabeticamente por nome dos laureados com os campos correspondentes ao nome, ano do prémio e categoria
module.exports.listarLaureados = () =>{
    return Prize
            .aggregate([{$unwind: "$laureates"}, 
                        {$group: 
                            {_id: "$laureates.id", 
                            firstname:{$first: "$laureates.firstname"},
                            surname:{$first: "$laureates.surname"},
                            prize: 
                                    {$push: 
                                        {year:"$year", category:"$category"}
                                    }
                            }
                        },
                        {$project: 
                            {firstname:1, surname:1, prize:1, _id:0}
                        }
                    ])
            .sort({firstname:1, surname:1})
            .exec()
  }
  



