window.onload=function(){
    var table=document.getElementById("movie_details")

    var button=document.getElementById('search');
    button.onclick=function(){
        const div = document.getElementById('movie_details');
        while(div.firstChild){
        div.removeChild(div.firstChild);
                   }
        var location=document.getElementById("Location_for_movie").value;
        var date=document.getElementById("Date").value;
        console.log(location,date);
    var url=new URL("http://127.0.0.1:5500/public/showtimes.json"),
    params = {location:location, date:date}
 Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
    .then((response)=>response.json())
    .then(function(data){
        var time=document.getElementById("Date");
    for(var i=0;i<data.length;i++){
        if(data[i].date=="2021/01/01"){
        var row=table.insertRow(i);
        row.setAttribute("id","table_rows");
        var title=row.insertCell(0);
        title.setAttribute("class","moviecell");
        title.innerHTML=data[i].title;
        var time=row.insertCell(1);
        time.setAttribute("id","cell");
        for(var j=0;j<data[i].times.length;j++){
            var showtime=document.createElement("ul");
            showtime.innerHTML=data[i].times[j];
            time.append(showtime);
            console.log(showtime);
        }
        }
    }
    $('.moviecell').on('click',
    function(){
        
          var table_form=document.getElementById('field_form');
          table_form.style.display='block';
          for(var i =0;i<data.length;i++){
              if(this.innerHTML==data[i].title){
                fetch('https://www.omdbapi.com/?i='+data[i].id+'&apikey=d9703216')
                .then((response)=>response.json())
                .then(function(data){
                    const div = document.getElementById('rating');

                    while(div.firstChild){
                   div.removeChild(div.firstChild);
                   }
                    var image=document.getElementById("image");
                    image.src=data.Poster;
                    var title=document.getElementById("title");
                    title.value=data.Title;
                    var year=document.getElementById("year");
                    year.value=data.Year;
                    var genre=document.getElementById("genre");
                    genre.value=data.Genre;
                    var runtime=document.getElementById("runtime");
                    runtime.value=data.Runtime;
                    var director=document.getElementById("director");
                    director.value=data.Director;
                    var writer=document.getElementById("writer");
                    writer.value=data.Writer;
                    var actor=document.getElementById("Actors");
                    actor.value=data.Actors;
                    var plot=document.getElementById("plot");
                    plot.value=data.Plot;
                    var imdb=data.imdbRating;
                    var rating=document.getElementById("rating");
                   
                    for(var i=0;i<imdb;i++){
                        var img = document.createElement("img");
                        img.src = "images/trophy.png";
                     rating.appendChild(img);
                     console.log(rating);        }
                })
            }
          }
        })
    });
    
}
}

