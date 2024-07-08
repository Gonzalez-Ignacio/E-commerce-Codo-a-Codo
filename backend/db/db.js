const mySql = require('mysql2');
require('dotenv').config();

const connection = mySql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

connection.query('CREATE DATABASE IF NOT EXISTS ecommercecac2024', (err, result) => {
    if (err) {
        console.error("Error creando la base de datos", err);
        return
    }
    console.log("Base de datos creada exitosamente");

    connection.changeUser({database: `ecommercecac2024`}, (err) => {
        if (err) {
            console.error("Error al cambiar a `ecommercecac2024`", err);
            return;
        }

        const createTableQuery = `CREATE TABLE IF NOT EXISTS usuarios (
            idUsuario INT AUTO_INCREMENT PRIMARY KEY,
            nombreUsuario VARCHAR(50) NOT NULL,
            contraseña VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL
        )`;
        
        connection.query(createTableQuery, (err, result) => {
            if (err) {
                console.error("Error creando la tabla de usuarios", err);
                return;
            }
            console.log("Tabla de usuarios creada exitosamente");
        })
    })
})

connection.connect((err) => {
    if(err) {
        console.error("Error conectando a la base de datos", err);
        return
    }
    console.log("Conexión exitosa a la base de datos");
})

module.exports = connection;