let sqlite3 = require("sqlite3")


let db = new sqlite3.Database("records.db")

let sql1 = `SELECT * FROM students WHERE idcode='123456'`;
let sql2 = `SELECT * FROM staffs WHERE idcode='112233443'`;

db.get(sql1, [], (err, row) => {
    if (err) {
      throw err;
    }
    else if (row == null){
       db.get(sql2, [], (err, row) => {
            if (err) {
              throw err;
            }
            else if (row == null){
                 console.log("Not registered");
            }
            console.log(row);
    })
  }
  else{
        console.log(row);
  }
       
  });
  // close the database connection
  db.close();