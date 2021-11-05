//rutas para crear a los usuarios del sistema
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const { check } = require('express-validator');

//creando un usuario
// api/users
router.post('/', 
    [//validando con express-validator
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password tiene que contener almenos 6 letras').isLength({ min: 8 })
    ]
    , userController.createUser );

module.exports = router;