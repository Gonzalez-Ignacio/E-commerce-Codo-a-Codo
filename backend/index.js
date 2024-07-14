const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const usuariosRouter = require('./routes/usuarios');
const productosRouter = require('./routes/productos');
const comprasRouter = require('./routes/compras');

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de la API
app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/compras', comprasRouter);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Escuchando puerto');
});

// Cualquier otra ruta debería devolver el index.html del frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});