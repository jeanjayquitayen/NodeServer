
let sqlite3 = require('sqlite3').verbose();



  function  UpdateData(drugtest, xray, urinalysis, bloodtyping, HBSag, Vaccine1, Vaccine2, Vaccine3,stdnum){
        let sql_result = `UPDATE results SET
        drugtest        = ?,
        xray            = ?,
        urinalysis	    = ?,
        bloodtyping	    = ?,
        HBSag	        = ?,
        Vaccine1	    = ?,
        Vaccine2	    = ?,
        Vaccine3	    = ?
        WHERE  owner = ?`;
        let db = new sqlite3.Database('records.db');
        db.run(sql_result, [drugtest,xray,urinalysis,bloodtyping,
            HBSag,Vaccine1,Vaccine2,Vaccine3,stdnum], (err) => {
            if (err) {
              throw err;
            }
            console.log(`Rows Updated ${this.changes}`);
          });
          // close the database connection
            db.close();
    }



module.exports.UpdateData = UpdateData;

