import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

var connection = mysql.createConnection({
    host     : process.env.MYSQL_HOSTNAME || "localhost",
    user     : process.env.MYSQL_USER || "root",
    password : process.env.MYSQL_PASSWORD || "root",
    database : process.env.MYSQL_DATABASE || "music_api",
    port : process.envMYSQL_PORT || 3306
});
   
connection.connect((error) => {
  if (error) {
    console.log('Error occured while connecting to database: ' + error.message);
  } else {
    console.log('Database connected succesfully!');
  }
});

export default connection