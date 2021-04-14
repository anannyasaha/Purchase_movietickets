let express = require('express');


let model = require(__dirname + '/model/showtimes_model.js');
let model2 = require(__dirname + '/model/purchases_model.js');
let app = express();
app.use(express.static('public'));
const session=require('express-session');
const {v4:uuidv4}=require('uuid');
app.use(express.urlencoded({extended:false}));

app.use('/', function (request, response, next) {
    console.log('HTML file being generated.');
    next();
});
app.get('/', function (request, response, next) {
    response.sendFile(__dirname + '/public/showtimes.html');
    next();
});
app.use(session({
    genid:uuidv4,
    resave:false,
    saveUninitialized:false,
    //cookie:{secure:true},
    secret:'3230 examples typing fast need coffee'
}));
app.set('views',__dirname+'/public/views');
app.set('view engine','pug');
app.get('/buyticket',function(request,response){
    response.render('buyticket',{
        title:"buy ticket",
         movie_id:request.query.movie_id,
         movie_title:request.query.movie_title,
         location_id:request.query.location_id,
         location:request.query.location,
         selected_date:request.query.selected_date,
         start_time:request.query.start_time
    });
});
app.post('/buyticket',(request,response)=>{
   model2.addPurchase(request.body.movie_id,request.body.location_id,request.body.location,request.body.selected_date,request.body.start_time,()=>{
    response.render('purchase_confirm',{
   
   });
   });
});
app.get('/showtimes_api', function (request, response) {

    var location_id = request.query.location_id;
    var selected_date = request.query.selected_date;
    model.find({ location:parseInt(location_id), date: selected_date.replace(/-/g, '/')})
        .then(function (showtime_return) {   
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