let express = require('express');
const bcrypt = require('bcryptjs');

let model = require(__dirname + '/model/showtimes_model.js');
let app = express();
app.use(express.static('public'));

app.use('/', function (request, response, next) {
    console.log('HTML file being generated.');
    next();
});
app.get('/', function (request, response, next) {
    response.sendFile(__dirname + '/public/showtimes.html');
    next();
})
app.get('/showtimes_api', function (request, response) {

    var location_id = request.query.location_id;
    var selected_date = request.query.selected_date;
    console.log(selected_date.replace(/-/g, '/'));
    model.find({ location:parseInt(location_id), date: selected_date.replace(/-/g, '/')})
        .then(function (showtime_return) {   
             console.log(showtime_return); 

             response.json(showtime_return);
            
}).catch(function(error){
    console.log(error);
})
;

});
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});