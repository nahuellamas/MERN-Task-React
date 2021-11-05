const User = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const { password, email } = req.body;

    try {
        //revisamos que no sea duplicado para el email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }
        //crea el nuevo usuario
        user = new User(req.body);
        //encriptamos la password con el hash
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        //guardmos el usuario en mongo
        await user.save();
        //crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };
        //firmar el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 //1 hora de validez
        }, (error, token) => {
            if (error) throw error;
            //retornamos el usuario
            res.json({token: token});
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};