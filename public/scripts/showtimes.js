window.onload=function(){
    var table=document.getElementById("movie_details")

    var button=document.getElementById('search');
    button.onclick=function(){
    fetch('showtimes.json')
    .then((response)=>response.json())
    .then(function(data){
        var time=document.getElementById("Date");
    for(var i=0;i<data.length;i++){
        if(data[i].date=="2021/01/01"){
        var row=table.insertRow(i);
        var title=row.insertCell(0);
        title.innerHTML=data[i].title;
        var time=row.insertCell(1);
        time.innerHTML=data[i].times;
        console.log(data[i].times);
        }
    }
    });
    
}
}