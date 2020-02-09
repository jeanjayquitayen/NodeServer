var express = require('express');
// let date = new Date();
// var path = require('path');
const port = 3000;
var sqlite3 = require('sqlite3').verbose();
var cors = require('cors')
var app = express();
process.on('SIGINT', function() {
     console.log('Got SIGINT signal');
     process.exit(0);
   });

   var whitelist = [
     'http://localhost:3000','http://192.168.1.143:8080/'
 ];
 var corsOptions = {
     origin: function(origin, callback){
         var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
         callback(null, originIsWhitelisted);
     },
     credentials: true
 };
 app.use(cors(corsOptions));

var server = app.listen(port, () => {
     console.log('on port' + port)
     })
var io = require('socket.io')(server);
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const SerialConfig = require('config');
const ArduinoPort = SerialConfig.get("Arduino.port");
const usbport = new SerialPort(ArduinoPort,{
      baudRate: 9600
     });
const parser = usbport.pipe(new Readline({delimiter: '\r\n'}));

let update = require('./updatedata.js')
parser.on('data', (data)=>{
     console.log(data);
     let db = new sqlite3.Database('records.db');
     let sql1 = `SELECT * FROM students CROSS JOIN results ON results.owner = students.stdnum WHERE \
     students.idcode='${data}'`;
     let sql2 = `SELECT * FROM staffs WHERE idcode='${data}'`;
     // let sqlupdate = `UPDATE students SET requested = ? WHERE idcode= ?`
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
               io.sockets.emit('serverData', row);
       })
     }
     else{
          io.sockets.emit('serverData', row);
     }
          
     });
     // close the database connection
     // db.close();
  });
usbport.on('error',(err)=>{
     console.log(err);
})
usbport.on('open',()=>{
     console.log('Arduino Communication Established!');
})

io.sockets.on('connection',(socket)=>{
     
     console.log('Socket Connection Established!');
     console.log(socket.id);
     socket.on('confirmConnection',(data)=>{
          console.log("received event")
          io.emit('serverMessage','ok');
     });
     socket.on('findid', (data)=>{
          let db = new sqlite3.Database('records.db');
          let sqlget = `SELECT * FROM students INNER JOIN results on results.owner = students.stdnum WHERE \
          students.stdnum='${data}'`;
          console.log(data)
          db.get(sqlget, [], (err, row) => {
               if (err) {
                 throw err;
               }
               io.sockets.emit('serverData', row);

          });
           db.close()
     });
     socket.on('updateResult', (data)=>{
          update.UpdateData(data.dtest,data.xray,data.uri,data.btype,data.hbsag,data.v1,data.v2,data.v3)
          console.log(data)
     });
});

