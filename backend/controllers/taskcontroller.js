const Task = require('../models/Task');
const Proyect = require('../models/Proyect');
const {validationResult} = require('express-validator');

//crea nueva tarea
exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json( {errors: errors.array() });
    }
    //extraer el proyect y ver si existen
    try {
        const { proyect } = req.body;
        const existeProyect = await Proyect.findById(proyect);
        if (!existeProyect) {
            return res.status(400).json( {msg: 'Proyecto NO encontrado'});
        }
        //revisar si el proyecto pertenece al usuario autenticado
        if(existeProyect.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'NO autorizado'})
        }
        //creamos la tarea
        const task = new Task(req.body);
        await task.save();
        res.json({task});
    } catch (error) {
         console.log(error);
         res.status(500).send('Hubo un error')
    }

};

exports.getTasks = async (req, res) => {
    try {
        //extraer el proyect y ver si existen
        const { proyect } = req.query;
        const existeProyect = await Proyect.findById(proyect);
        if (!existeProyect) {
            return res.status(400).json( {msg: 'Proyecto NO encontrado'});
        }
        //revisar si el proyecto pertenece al usuario autenticado
        if(existeProyect.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'NO autorizado'})
        }
        //Obtener las tareas por Proyecto
        const tasks = await Task.find({ proyect }).sort({ creado: -1 });
        res.json({tasks});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
};

exports.updateTask = async (req, res) => {
    try {
        //extraer el proyect y ver si existen
        const { proyect, name, status } = req.body;
        const existeProyect = await Proyect.findById(proyect);
        if (!existeProyect) {
            return res.status(400).json( {msg: 'Proyecto NO encontrado'});
        }
        //revisar si el proyecto pertenece al usuario autenticado
        if(existeProyect.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'NO autorizado'})
        }
        //Si existe la tasks
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({msg: 'Tarea NO encontrada'});
        }
        //Crear una Nueva task con la info Nueva
        const newTask = {};
        newTask.name = name;
        newTask.status = status;
        //Guardar la tarea
        const actualTask = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true});
        res.json({actualTask});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
};

exports.deleteTask = async (req, res) => {
    try {
        //extraer el proyect y ver si existen
        const { proyect } = req.query;
        const existeProyect = await Proyect.findById(proyect);
        if (!existeProyect) {
            return res.status(400).json( {msg: 'Proyecto NO encontrado'});
        }
        //revisar si el proyecto pertenece al usuario autenticado
        if(existeProyect.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'NO autorizado'})
        }
        //Si existe la tasks
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({msg: 'Tarea NO encontrada'});
        }

        //Eliminar la tarea
        await Task.findOneAndDelete({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};