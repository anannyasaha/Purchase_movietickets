
window.onload=function(){
    var location;
    var place;
    var date;
    var table=document.getElementById("movie_details")

    var button=document.getElementById('search');
    button.onclick=function(){
        const div = document.getElementById('movie_details');
        while(div.firstChild){
        div.removeChild(div.firstChild);
                   }
        location=document.getElementById("Location_for_movie").value;
        
        if(location==1){
            place="Oshawa Cinemas";
        }
        if(location==2){
           place="Ajax Cinemas";
        }
        if(location==3){
            place="Whitby Cinemas";
        }
        date=document.getElementById("Date").value;
        console.log(location,date);
    var url=`showtimes_api?location_id=${location}&selected_date=${date}`;
//     params = {location:location, date:date}
//  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  console.log(url);
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
           // var buybutton=document.createElement("button");
           // buybutton.setAttribute("id","buybutton");
            
            var buy=document.createElement("img");
            buy.setAttribute('class','buybutton');
            buy.setAttribute('id',"buybutton"+i+j);
            buy.src="images/buy.png";
            
           // buybutton.style.backgroundImage="url('images/buy.png')";
            showtime.innerHTML=data[i].times[j];
            time.append(showtime);
            //console.log(buybutton.style.backgroundImage);
            time.append(buy);
            console.log(showtime);
        }
        }
    }
    $('.buybutton').on('click',function(){
        var datarow=this.id.slice(9,10);
        var time=this.id.slice(10);
        var movie_id=data[datarow].id;
        var movie_title=data[datarow].title;
        var starttime=data[datarow].times[time];
     var url=`buyticket?location_id=${location}&location=${place}&selected_date=${date}&movie_id=${movie_id}&movie_title=${movie_title}&start_time=${starttime}`;
    window.location.href=url;
    })
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

