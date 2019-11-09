function apagarFilme(id){
    console.log('Vou tentar apagar o ' + id + '....')
    axios.delete('/filmes/' + id)
        .then(response => window.location.assign('/filmes'))
        .catch(error => console.log(error))
}

function editFilm(id){  
    var f = {}
    f.title = document.getElementById('titulo').value
    f.year = document.getElementById('ano').value
    f.genres = new Array()
    f.cast = new Array()
    var genres = document.getElementsByClassName('generos')
    var actors = document.getElementsByClassName('atores')
    for(g of genres)
      f.genres.push(g.value)
    for(a of actors)
      f.cast.push(a.value)

    axios.put('/filmes/' + id, f)
        .then(response =>  window.location.assign('/filmes/editarFilme/' + id))
        .catch(error => console.log("PUT " + error))
}

function addField(container, aClass, name){
  var input = document.createElement("INPUT")
  input.classList.add("w3-input")
  input.classList.add("w3-border")
  input.classList.add("w3-light-grey")
  input.classList.add("w3-threequarter")
  input.classList.add(aClass)
  input.type = "type='text'"
  if(name != undefined)
    input.name = name
  input.value = ''
  input.required = true
  var div = document.createElement("DIV")
  div.classList.add("w3-container")
  var addButton = document.createElement("SPAN")
  var icon = document.createElement("I")
  icon.classList.add("fa")
  icon.classList.add("fa-times")
  icon.classList.add("fa-2")
  icon.onclick= function(){
    removeElement(icon)
  }
  div.append(input)
  div.append(addButton)
  addButton.append(icon)
  document.getElementById(container).append(div)
}

function removeElement(element){
  var spanParent = element.parentElement;
  console.log(spanParent)
  var container = spanParent.parentElement;
  console.log(container)
  var div = container.parentElement;
  console.log(div)
  div.removeChild(container)
}