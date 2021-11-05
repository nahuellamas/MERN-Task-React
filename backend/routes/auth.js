//rutas para autenticacion del usuario
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authcontroller');
const auth = require('../middleware/autentication');

//autenticando un usuario
// api/auth
router.post('/', authController.authenticateUser );

//obtiene el user autenticado
router.get('/', 
    auth,
    authController.isAuth);

module.exports = router;