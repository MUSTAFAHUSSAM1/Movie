const mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"demo-backend",
  port:"3306", //
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Db Connected!");
});
module.exports = connection;