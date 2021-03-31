window.onload=function(){
    var table=document.createElement("table");
    
    var button=document.getElementById('search');
    button.onclick=function(){
    fetch('showtimes.json')
    .then((response)=>response.json())
    .then(function(data){
    
    }
    );
}
}