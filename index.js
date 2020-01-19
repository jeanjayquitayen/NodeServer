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
var io = require('socket.io')(server)
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const usbport = new SerialPort('/dev/ttyUSB0',{
      baudRate: 9600
     });
const parser = usbport.pipe(new Readline({delimiter: '\r\n'}));
parser.on('data', (data)=>{
     console.log(data);
     let db = new sqlite3.Database('test.db');
     let sql = `SELECT * FROM students WHERE idcode= '${data}'`;
     // let sqlupdate = `UPDATE students SET requested = ? WHERE idcode= ?`
     db.get(sql, [], (err, row) => {
       if (err) {
         throw err;
       }
          io.sockets.emit('serverData', row);
     });
     // close the database connection
     db.close();
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
     socket.on('confirmConnection',(socket)=>{
          console.log("received event")
          io.emit('serverMessage','ok');
     })
     });

