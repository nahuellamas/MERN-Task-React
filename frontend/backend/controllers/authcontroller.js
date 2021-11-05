const User = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        //revisamos si esta registrado
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }
        //revisamos si la contraseña es correcta
        const validPass = await bcryptjs.compare(password, user.password);
        if (!validPass) {
            return res.status(400).json({msg: 'Contraseña incorrecta'});
        }
        //si todo es correcto creamos el token y lo firmamos
        const payload = {
            user: { id: user.id }
        };
        jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
    }

};

//verificamos si el token es correcto y obtenemos el uauario autenticado

exports.isAuth = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
};


