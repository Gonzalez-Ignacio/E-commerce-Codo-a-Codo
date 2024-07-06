const mySql = require('mysql2');
const connection = mySql.createConnection(
    {
        host : 'localhost',
        user: 'root',
        password: '',
        database: 'grupo19'
    });


    connection.connect((err) =>
    {
        if(err)
        {
            console.error("Error conectando a la base de datos",err);
            return;
        }


        console.log("Conectado a la base de datos");


        connection.query('CREATE DATABASE IF NOT EXISTS grupo19', (err,results) =>
        {
            if(err)
            {
                console.log("Error creando la base de datos");
                return;
            }


            console.log("Base de datos asegurada");


            connection.changeUser({database : 'grupo19'}, (err)=>
            {
                if(err)
                {
                    console.error("Error al cambiar a grupo19",err);
                    return;
                }

            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS usuarios (
                    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(100) NOT NULL
                );            
            `;
                    // no van
                    // id INT AUTO_INCREMENT PRIMARY KEY,
                    // nombre VARCHAR(100) NOT NULL,
                    // apellido VARCHAR(100) NOT NULL,
                    // mail VARCHAR(255) NOT NULL

            connection.query(createTableQuery,(err,results) =>
            {
                if(err)
                {
                    console.log("Error creando la tabla: " , err);
                    return;
                }


                console.log("Tabla asegurada");
            });
        });


    });


});


module.exports = connection;