const db = require("../db/db");

const realizarCompra = (req, res) => {
    const { nombreUsuario, carrito, importeTotal } = req.body;

    const insertarPedido = (finalizarPedido) => {
        const sqlInsertarPedido =
            "INSERT INTO pedidos (nombreUsuario, importeTotal) VALUES (?, ?)";

        db.query(
            sqlInsertarPedido,
            [nombreUsuario, importeTotal],
            (err, result) => {
                if (err) return finalizarPedido(err);
                const idPedido = result.insertId;
                finalizarPedido(null, idPedido);
            }
        );
    };

    insertarPedido((err, idPedido) => {
        if (err) {
            return res
                .status(500)
                .json({ mensaje: "Error al insertar el pedido", error: err });
        }

        // Procesar cada item del carrito
        const procesarItem = (item, finalizarItem) => {
            const { nombreProducto, cantidad, importePorProducto } = item;

            // Buscamos idProducto a través del nombreProducto
            const sqlBuscarIdProducto = 'SELECT idProducto FROM productos WHERE nombre = ?';
            db.query(sqlBuscarIdProducto, [nombreProducto], (err, result) => {
                if (err) return finalizarItem(err);

                const idProducto = result[0].idProducto


                // Insertar item en la tabla de "itempedidos"
                const sqlInsertarItem =
                    "INSERT INTO itempedidos (idPedido, idProducto, cantidad, importePorProducto) VALUES (?, ?, ?, ?)";
                db.query(
                    sqlInsertarItem,
                    [
                        idPedido,
                        idProducto,
                        cantidad,
                        importePorProducto,
                    ],
                    (err) => {
                        if (err) return finalizarItem(err);
    
                        finalizarItem(); //Finalizamos el procesamiento del item
                    }
                );
            })

        };

        // Procesar todos los item del carrito
        let pendientes = carrito.length;

        carrito.forEach((item) => {
            procesarItem(item, (err) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ mensaje: "Error al insertar los items de pedido", error: err });
                }

                pendientes -= 1;

                if (pendientes === 0) {
                    //Si se procesan los items, enviamos la respuesta
                    res.json({ 
                        mensaje: "Compra realizada con éxito",
                        id: idPedido 
                    });
                }
            })
        })
    });
};


module.exports = {
    realizarCompra
}