
window.onload=function(){
        
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=d9703216')
    .then((response)=>response.json())
    .then(function(data){
        var image=document.getElementById("image");
        image.src=data.Poster;
        console.log(data)
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

    }
        );
}