function deleteMusic(id){
    axios.delete('/' + id)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}

function editMusic(id){
    axios.put('/' + id, content)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}