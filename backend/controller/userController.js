const db = require("../db/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");

const ObtenerTodosLosUsuarios = (req, res) => {
    const sql = "SELECT * FROM usuarios";

    db.query(sql, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
};

const ObtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM usuarios WHERE idUsuario = ?`; // ? es el parámetro de la consulta ingresado por el usuario

    db.query(sql, [id], (err, result) => {
        {
            if (err) throw err;

            res.json(result);
        }
    });
};

const register = (req, res) => {
    const { nombreUsuario, contraseña, email, adminUser } = req.body;

    const hashedPassword = bcrypt.hashSync(contraseña, 8);

    const sql = `INSERT INTO usuarios (nombreUsuario, contraseña, email, adminUser) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nombreUsuario, hashedPassword, email, adminUser], (err, result) => {
        if (err) throw err;

        // Creacion del token
        const token = jwt.sign(
            { idUsuario: result.insertId, nombreUsuario: nombreUsuario },
            config.secretKey,
            { expiresIn: config.tokenExpiresIn } 
        );

        // Enviar la respuesta con el token
        res.status(201).send({ auth: true, token });
    });
};

const login = (req, res) => {
    const { nombreUsuario, contraseña } = req.body;

    const sql = `SELECT * FROM usuarios WHERE nombreUsuario = ?`;

    db.query(sql, [nombreUsuario], (err, result) => {
        if (err) throw err;
     
        // Si el usuario no se encuentra, devuelve un error 404 con el mensaje 'Usuario no encontrado'
        if (result.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado.' });
        }
            
        const user = result[0];

        // Compara la contraseña proporcionada con la contraseña almacenada
        const passwordIsValid = bcrypt.compareSync(contraseña, user.contraseña);

        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        // Generamos el token
        const token = jwt.sign(
            { idUsuario: user.idUsuario, nombreUsuario: user.nombreUsuario },
            config.secretKey,
            { expiresIn: config.tokenExpiresIn } 
        );

        // Envía el token JWT al cliente con estado 200 y el resultado
        res.status(200).send({
            auth: true,
            token,
            result
        });
    });
};

const ActualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombreUsuario, contraseña, email } = req.body;

    const sql =
        "UPDATE usuarios SET nombreUsuario = ?, contraseña = ? , email = ? WHERE idUsuario = ?";

    db.query(sql, [nombreUsuario, contraseña, email, id], (err, result) => {
        if (err) throw err;

        res.json({
            mensaje: "Usuario EDITADO",
        });
    });
};

const BorrarUsuario = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM usuarios WHERE idUsuario = ?";

    db.query(sql, [id], (err, result) => {
        if (err) throw err;

        res.json({
            mensaje: "usuario ELIMINADO con EXITO",
        });
    });
};

module.exports = {
    ObtenerTodosLosUsuarios,
    ObtenerUsuarioPorId,
    register,
    login,
    ActualizarUsuario,
    BorrarUsuario,
};
