var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FilmeSchema = new Schema({
    title: {type: String, required: true},
    year: {type: Number, required: true},
    cast: Array,
    genres: Array
})

module.exports = mongoose.model('filmes', FilmeSchema)

