let express = require('express');

let app = express();
app.use(express.static('public'));

app.use('/', function(request, response, next) {
    console.log('HTML file being generated.');
    next();
});
app.get('/', function(request,response,next){
    response.sendFile(__dirname+'/public/showtimes.html');
    next();
})
app.get('/', function(request, response,next) { 
    var location=request.query.location;
    var date=request.query.date;
    console.log(request.query);
    
    next();
});
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});