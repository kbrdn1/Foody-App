import mysql from 'mysql'
import { config } from 'dotenv'

config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
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