'use strict';
var inquirer = require('inquirer');
// var chalkPipe = require('chalk-pipe');


let sqlite3 = require('sqlite3').verbose();

var questions = [
  {
    type: 'input',
    name: 'first_name',
    message: "What's your first name"
  },
  {
    type: 'input',
    name: 'last_name',
    message: "What's your last name",
  },
  {
    type: 'input',
    name: 'mid_name',
    message: "What's your middle name",
  },
  {
    type: 'input',
    name: 'gender',
    message: "Male or Female?",
  },
  {
    type: 'input',
    name: 'course',
    message: "What's your course",
  },
  {
    type: 'input',
    name: 'year',
    message: "What's your year level",
  },

  {
    type: 'input',
    name: 'idnumber',
    message: "What's your id number",
  },
  {
    type: 'password',
    name: 'pin',
    message: "Enter pin",
  }
];


const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline; var inquirer = require('inquirer');
// var chalkPipe = require('chalk-pipe');
let manage = require('./insertdata.js');
const SerialConfig = require('config');
const ArduinoPort = SerialConfig.get("Arduino.port");
const usbport = new SerialPort(ArduinoPort,{
      baudRate: 9600
    
     });
usbport.on('error',(err)=>{
     console.log(err);
     
})
usbport.on('open',()=>{
     console.log('Arduino Communication Established!');
     
})    
const parser = usbport.pipe(new Readline({delimiter: '\r\n'})); 
parser.on('data', (data)=>{
    console.log(data);
    let db = new sqlite3.Database('records.db');
    let sql = `SELECT * FROM students WHERE idcode= '${data}'`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      if(rows.length > 0){
          console.log("ID already exists!")
        // rows.forEach((row) => {
        //     console.log(row);
        //   });
      }
      else{
        inquirer.prompt(questions).then(answers => {
            console.log(data);
            console.log(JSON.stringify(answers, null, '  '));
            manage.InsertData(
              answers.first_name,
              answers.last_name,
              answers.mid_name,
              answers.course,
              answers.year,
              answers.gender,
              data,
              answers.idnumber,
              answers.pin
            );
          });
      }
    });
     
    // // close the database connection
    // db.close();

    
 });




