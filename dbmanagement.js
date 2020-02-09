const sqlite3 = require('sqlite3').verbose();
 
let db = new sqlite3.Database('records.db');
function createTable(){
    db.run(`CREATE TABLE "students" (
        "id"	integer PRIMARY KEY AUTOINCREMENT,
        "firstname"	TEXT NOT NULL,
        "lastname"	TEXT NOT NULL,
        "middlename"	text NOT NULL,
        "course"	TEXT NOT NULL,
        "year"	integer NOT NULL,
        "gender"	text NOT NULL,
        "idcode"	TEXT NOT NULL,
        "stdnum"	TEXT NOT NULL
    )`);
    
    db.run(`CREATE TABLE "results" (
        "recordid"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "date"	TEXT,
        "daterel"	TEXT,
        "drugtest"	TEXT,
        "xray"	TEXT,
        "urinalysis"	TEXT,
        "bloodtyping"	TEXT,
        "HBSag"	TEXT,
        "Vaccine1"	TEXT,
        "Vaccine2"	TEXT,
        "Vaccine3"	TEXT,
        "VaccinationDate"	TEXT,
        "owner"	TEXT NOT NULL,
        FOREIGN KEY("owner") REFERENCES students ("stdnum")
    )`);

    db.run(`CREATE TABLE "staffs" (
        "id"	integer PRIMARY KEY AUTOINCREMENT,
        "firstname"	TEXT NOT NULL,
        "lastname"	TEXT NOT NULL,
        "middlename"	TEXT NOT NULL,
        "prc"	TEXT NOT NULL,
        "idcode"	TEXT NOT NULL
    )`);
}

createTable()
db.close()
