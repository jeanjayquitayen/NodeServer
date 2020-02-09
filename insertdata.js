
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('records.db');


  function  InsertData(firstname,lastname,middlename,course,year,gender,idcode,stdnum){
        let sql = `INSERT INTO students(
          firstname,
          lastname,
          middlename,
          course,
          year,
          gender,
          idcode,
          stdnum)
         VALUES(?,?,?,?,?,?,?,?)`;
        db.run(sql, [firstname,lastname,middlename,course,year,gender,idcode,stdnum], (err) => {
            if (err) {
              throw err;
            }
            console.log(`Rows inserted ${this.changes}`);
          });
        let sql_result = `INSERT INTO results (owner) VALUES(?)`;
        db.run(sql_result, [stdnum], (err) => {
            if (err) {
              throw err;
            }
            console.log(`Rows inserted ${this.changes}`);
          });
          // close the database connection
          db.close();
    }



module.exports.InsertData = InsertData;

