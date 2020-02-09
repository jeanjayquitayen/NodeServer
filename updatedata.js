
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('records.db');


  function  UpdateData(drugtest, xray, urinalysis, bloodtyping, HBSag, Vaccine1, Vaccine2, Vaccine3,stdnum){
        let sql_result = `UPDATE results SET
        drugtest        = ?,
        xray            = ?,
        urinalysis	    = ?,
        bloodtyping	    = ?,
        HBSag	        = ?,
        1stVaccine	    = ?,
        2ndVaccine	    = ?,
        3rdVaccine	    = ?,
        WHERE  owner = ?`;
        db.run(sql, [drugtest,xray,urinalysis,bloodtyping,
            bloodtyping,HBSag,Vaccine1,Vaccine2,Vaccine3,stdnum], (err) => {
            if (err) {
              throw err;
            }
            console.log(`Rows Updated ${this.changes}`);
          });
          // close the database connection
        //   db.close();
    }



module.exports.UpdateData = UpdateData;

