let express = require('express');

let app = express();
app.use(express.static('public'));

app.use('/', function(request, response, next) {
    console.log('HTML file being generated.');
    next();
});
app.get('/', function(request,response){
    response.sendFile(__dirname+'/public/showtimes.html');
})
app.get('/', function(request, response) { 
    console.log(request.query);
    response.send("data entered");
});
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});