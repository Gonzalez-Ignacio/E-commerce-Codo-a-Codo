const express = require('express');
const cors = require('cors');
const app = express();
let PORT = 3000;

const usuariosRouter = require('./routes/usuarios');
const productosRouter = require('./routes/productos');
// const pedidosRouter = require('./routes/ventas');

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
// app.use('/pedidos', pedidosRouter);

app.get('/', (req, res) => {
    res.send('Escuchando puerto');
})

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
})