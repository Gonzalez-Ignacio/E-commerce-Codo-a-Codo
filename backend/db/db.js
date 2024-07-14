const mySql = require('mysql2');
require('dotenv').config();

const connection = mySql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

connection.connect((err) => {
    if(err) {
        console.error("Error conectando a la base de datos", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos");
});

module.exports = connection;