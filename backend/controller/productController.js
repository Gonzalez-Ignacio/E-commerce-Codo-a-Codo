const db = require('../db/db.js');

const ObtenerTodosLosProductos = (req, res) => {
  const sql = "SELECT * FROM productos";

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const ObtenerProductoPorId = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM productos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

module.exports = {
  ObtenerTodosLosProductos,
  ObtenerProductoPorId
};