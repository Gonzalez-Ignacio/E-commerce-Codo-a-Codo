const express = require('express');
const cors = require('cors');
const app = express();
let port = 3000;

const usuariosRouter = require('./routes/usuarios');

app.use(cors());
app.use(express.json());

app.use('/usuarios',usuariosRouter);

app.get('/', (req,res) => 
{
    //editar mensaje
    res.send('PUERTO LOCALHOST:3000');
});

app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puerto ${port}`)
});
