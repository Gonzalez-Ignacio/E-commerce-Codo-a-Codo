const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const usuariosRouter = require('./routes/usuarios');
const productosRouter = require('./routes/productos');
const comprasRouter = require('./routes/compras');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/compras', comprasRouter);

app.get('/', (req, res) => {
    res.send('Escuchando puerto');
})

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
})