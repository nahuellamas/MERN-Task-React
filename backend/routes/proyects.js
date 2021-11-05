const express = require('express');
const router = express.Router();
const proyectsController = require('../controllers/proyectscontroller');
const auth = require('../middleware/autentication');
const { check } = require('express-validator');
//creando un proyecto
// api/proyects
router.post('/',
    auth,
    [check('name', 'El nombre del proyecto es Obliogatorio').not().isEmpty()],
    proyectsController.createProyect
);
//obtener los proyectos de un usuario ya autenticado
router.get('/',
    auth, 
    proyectsController.getProyects
);

//actulizar un proyecto por ID
router.put('/:id',
    auth,
    [check('name', 'El nombre del proyecto es Obliogatorio').not().isEmpty()],
    proyectsController.upgradeProyect
);

//eliminar un proyecto
router.delete('/:id',
    auth,
    proyectsController.deleteProyect
);

module.exports = router;