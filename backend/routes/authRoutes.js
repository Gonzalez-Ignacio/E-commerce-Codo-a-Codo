const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

// Ruta protegida que requiere autenticación previa del usuario.
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send(`Hola usuario ${req.userId} - ${req.username}`);    
});

module.exports = router; 
