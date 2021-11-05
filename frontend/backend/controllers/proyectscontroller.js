const Proyect = require('../models/Proyect');
const { validationResult } = require('express-validator');

exports.createProyect = async (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json( {errors: errors.array() });
    }
    try {
        //crear el nuevo proyecto deue envien
        const proyect = new Proyect(req.body);
        //guardar el creador User creator del SCHEME
        proyect.creator = req.user.id;
        //guardamos proyecto
        proyect.save();
        res.json(proyect);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

//obtiene los proyects del usuario actual

exports.getProyects = async (req, res) =>{
    try {                          //El sort es para poner diferent la llegada por fechas                              
        const proyects = await Proyect.find({ creator: req.user.id }).sort({ creado: -1});
        res.json({ proyects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
//actualiza un proyecto
exports.upgradeProyect = async (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json( {errors: errors.array() });
    }
    //extraemos info del proyecto
    const {name} = req.body; 
    const UpProyect ={};
    if(name){
        UpProyect.name = name;
    }
    try {
        //revisar el id y buscamos por el id del put y de ls BD
        let proyect = await Proyect.findById(req.params.id);
        //si existe el proyecto
        if(!proyect){
            return res.status(404).json({msg: 'Proyecto no encontrado en la BD'});
        }
        //verificamos el creador User
        if(proyect.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'NO autorizado'})
        }
        //actualizamos el proyecto
        proyect = await Proyect.findByIdAndUpdate({ _id: req.params.id}, {$set: UpProyect}, {new: true} );
        res.json({proyect});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

//elimina un Proyecto
exports.deleteProyect =  async (req, res) => {
    try {
        //revisar el id y buscamos por el id del put y de ls BD
    let proyect = await Proyect.findById(req.params.id);
    //si existe el proyecto
    if(!proyect){
        return res.status(404).json({msg: 'Proyecto no encontrado en la BD'});
    }
    //verificamos el creador User
    if(proyect.creator.toString() !== req.user.id){
        return res.status(401).json({msg: 'NO autorizado'})
    }
    //eliminamos el proyecto
    await Proyect.findOneAndRemove({_id: req.params.id});
    res.json({msg: 'Proyecto Eliminado'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el server')
    }
}