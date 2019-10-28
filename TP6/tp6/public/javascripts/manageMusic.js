function deleteMusic(id){
    axios.delete('/' + id)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}

function editMusic(id){

    content = {
        id: id,
        prov:  document.getElementById('prov').value,
        local: document.getElementById('local').value,
        tit: document.getElementById('tit').value,
        musico: document.getElementById('musico').value,
        duracao: document.getElementById('duracao').value
      }

    axios.put('/' + id, content)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}