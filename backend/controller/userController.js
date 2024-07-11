const db = require("../db/db.js");

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

const ObtenerUsuarioPorNombre = (req, res) => {
    const { nombreUsuario } = req.params;
    const sql = `SELECT * FROM usuarios WHERE nombreUsuario = ?`; // ? es el parámetro de la consulta ingresado por el usuario

    db.query(sql, [nombreUsuario], (err, result) => {
        {
            if (err) throw err;

            res.json(result);
        }
    });
};

const crearUsuario = (req, res) => {
    const { nombreUsuario, contraseña, email, adminUser } = req.body;

    const sql = `INSERT INTO usuarios (nombreUsuario, contraseña, email, adminUser) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nombreUsuario, contraseña, email, adminUser], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: "Usuario creado exitosamente",
            idUsuario: result.insertId,
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
    ObtenerUsuarioPorNombre,
    crearUsuario,
    ActualizarUsuario,
    BorrarUsuario,
};
