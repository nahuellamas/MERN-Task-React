const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //leer el token del usuario el que se envia del body header
    const token = req.header('x-auth-token');
    //Revisamos el token
    if(!token) {
        return res.status(401).json({msg: "No hay token, PERMISO NO VALIDO"})
    }
    //validar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.user = cifrado.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: "No hay token, PERMISO no valido"})
    }
}