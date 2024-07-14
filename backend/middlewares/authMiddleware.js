const jwt = require('jsonwebtoken');
const config = require('../config/config');

 const authMiddleware= (req, res, next)=> {
  // Determina si hay un token en la cabecera de autorización
  const authHeader = req.headers['authorization'];

  // Si no hay token en la cabecera, devuelve un error 401 (no autorizado)
  if (!authHeader){
    return res.status(401).send({ auth: false, message: 'No se provee token en la cabecera' });}; 

  // Extrae el token de la cabecera (formato "Bearer [token]") bearer(portador)
  const token = authHeader.split(' ')[1];
  // En este caso, split(' ') se utiliza para dividir el encabezado por espacios en blanco 
  // y [1] se utiliza para seleccionar la segunda parte después de "Bearer"

  // Si no existe el token extraído, devuelve un error 403 (denegado)
  if (!token){
    return res.status(403).send({ auth: false, message: "No se provee token" });};
    //acceso denegado, la autentificación falló, no se provee token

  // Verifica el token usando la clave secreta y maneja los errores posibles
  // Traemos la clave secreta para utilizarla en .verify
  const secretKey = config.secretKey;

  jwt.verify(token, secretKey, (err, decoded) => {
    // Si hay un error al verificar como un token mal formado, devuelve un error con mensaje
    if (err) return res.status(500).send({ auth: false, message: 'Error al autenticar el token.' });
    
    // Si todo está bien con el token, procede con la solicitud y guarda el id del usuario en request.user_id 
    req.userId = decoded.id;
    req.username = decoded.username;
    next(); 
  });
};

module.exports = authMiddleware;