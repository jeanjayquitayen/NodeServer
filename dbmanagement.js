const sqlite3 = require('sqlite3').verbose();
 
let db = new sqlite3.Database('records.db');
function createTable(){
    db.run(`CREATE TABLE IF NOT EXISTS students (id integer PRIMARY KEY AUTOINCREMENT,
        firstname text not null,
        lastname text not null,
        middlename text not null,
        course text not null,
        year integer not null,
        gender text not null)`);
    
    db.run(`CREATE TABLE IF NOT EXISTS results (recordid integer PRIMARY KEY AUTOINCREMENT,
        date text not null,
        daterel text not null,
        drug integer not null,
        xray integer not null,
        FOREIGN KEY (recordid) REFERENCES students (id) )`);

    db.run(`CREATE TABLE IF NOT EXISTS staffs (id integer PRIMARY KEY AUTOINCREMENT,
        firstname text not null,
        lastname text not null,
        middlename text not null,
        prc text not null)`);
}

createTable()
db.close()
