const mongoose = require('mongoose');
const fs = require('fs');

(function () {

	if(process.argv.length < 5) {
		console.log("Argumentos insuficientes, uso: mongoimport <database> <model> <json>")
		return
	}

	let databaseName = process.argv[2]
	let modelName = process.argv[3] 
	let jsonFile = process.argv[4]

	fs.readFile(jsonFile, 'utf-8', (err, data) => {
  		if (err) {
			console.log("Erro ao abrir ficheiro json: " + err.message)
			return
		}

		jsonData = JSON.parse(data)

		mongoose.connect('mongodb://127.0.0.1:27017/' + databaseName, {useNewUrlParser: true, useUnifiedTopology: true})
			.then(() => {
				let schema = mongoose.Schema({}, { strict: false })
				let ModelSchema = mongoose.model(modelName, schema) // terceiro argumento nome da coleção
				new ModelSchema(jsonData).save()
					.then(() => {
						console.log(jsonFile + " importado com sucesso para a database " + databaseName)
						mongoose.connection.close()
					})
					.catch(err => console.log("Erro ao guardar na bd: " + err.message))
			})
			.catch(err => console.log("Erro na conexão com o mongo: " + err.message))
	});
})()