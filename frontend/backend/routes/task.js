const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontroller');
const auth = require('../middleware/autentication');
const { check } = require('express-validator');

//crear una tarea 
// api/task
router.post('/', 
    auth,
    [check('name', 'El nombre es Obligatorio').not().isEmpty(),
    check('proyect', 'El proyecto es Obligatorio').not().isEmpty()],
    taskController.createTask
);

//Obtener las tareas por Proyecto ID
router.get('/',
    auth,
    taskController.getTasks
);

//actualizar tareas por Proyecto ID
router.put('/:id',
    auth,
    taskController.updateTask
);

//eliminar una task
router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;