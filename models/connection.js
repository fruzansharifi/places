var mysql = require('mysql')
var util = require('util');
var connection = mysql.createConnection({
  host: 's11.liara.ir',
  user: 'root',
  password: 'nLabNW5G7guXotMOTEqJwtDc',
  database: 'agitated_albattani',
  port:34149
})
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'm.sharifi',
//   // port:34032
// })

connection.connect()
const dbConnection = util.promisify(connection.query).bind(connection);

module.exports = dbConnection;