import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "foody-app",
})

connection.connect((err) => {
    if (err) {
        throw new Error('Error while connecting to database')
    } else {
        console.log("Connected to database >> foody-app: http://localhost/phpmyadmin/index.php?route=/&route=%2F&db=foody-app")
    }
})

export default connection