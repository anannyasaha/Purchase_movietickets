
window.onload=function(){
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=d9703216')
    .then((response)=>response.json)
    .then(data=>console.log(data));
}