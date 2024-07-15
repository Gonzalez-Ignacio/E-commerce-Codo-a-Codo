const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const usuariosRouter = require('./routes/usuarios');
const productosRouter = require('./routes/productos');
const comprasRouter = require('./routes/compras');

// Conexión a la base de datos
const db = require('./db/db'); // Asegúrate de que la ruta a tu archivo de conexión a la base de datos es correcta

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

// Manejo de excepciones no capturadas
process.on('uncaughtException', (err) => {
    console.error('Excepción no capturada:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Rechazo no manejado en la promesa:', promise, 'razón:', reason);
});