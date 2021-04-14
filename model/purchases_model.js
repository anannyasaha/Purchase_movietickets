const sqlite3=require('sqlite3').verbose();
const db=new sqlite3.Database('./data/tickets.db',(err) => {
    if (err) {
        console.error('Error while connecting to database: ', err);
    } else {
        console.log('Connected to or created SQLite database');
    }
});
module.exports.db=db;
db.serialize(() => {
    db.run('DROP TABLE tickets')
      .run(`CREATE TABLE tickets(ticketId INTEGER PRIMARY KEY,
                                movie_id INTEGER,
                                location_id INTEGER,
                                location TEXT,
                                selected_date TEXT,
                                start_time TEXT)`)
       
      });
function addPurchase(movie_id,location_id,location,selected_date,start_time, callback) {
        db.run('INSERT INTO tickets(movie_id,location_id,location,selected_date,start_time) VALUES(?,?,?,?,?)', [movie_id,location_id,location,selected_date,start_time], (err) => {
            if (err) {
                console.error('Error inserting into database: ', err);
            } else {
                callback();
            }
        });
    }
    function deletePurchase(ticketId, callback) {
        db.run('DELETE FROM tickets WHERE ticketId = ?', ticketId, (err) => {
            if (err) {
                console.error('Error deleting from database: ', err);
            } else {
                callback();
            }
        });
    }
    function getAlltickets(callback) {
        db.all('SELECT movie_id,location_id,location,selected_date,start_time FROM tickets', (err, tickets) => {
            if (err) {
                console.error('Error querying database: ', err);
            } else {
                callback();
            }
        });
    }

module.exports.getAlltickets = getAlltickets;
module.exports.deletePurchase = deletePurchase;
module.exports.addPurchase = addPurchase;
    