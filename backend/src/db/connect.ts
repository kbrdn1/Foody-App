import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "foody-app",
})

connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to database: foody-app")
    }
})

export default connection