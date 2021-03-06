const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/moviedatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(error) {
    if (error) {
        console.error('Unable to connect: ', error);
    } else {
        console.log('Connected to MongoDB');
    }
});
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;
let movieSchema = new Schema({
    id: String,
    title: String,
    location: Number,
    date: String,
    times: [String],
}, {
    collection: 'movies'
});
module.exports=mongoose.model('movies',movieSchema);