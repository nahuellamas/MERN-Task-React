import { useContext, useState, useEffect } from 'react';
import proyectContext from '../../context/Proyectos/proyectContext'
import taskContext from '../../context/Tasks/taskContext';


const FormTask = () => {

    const proyectsContext = useContext(proyectContext);
    const { proyect } = proyectsContext;

    const tasksContext = useContext(taskContext);
    const {addTask, validateTask, taskerror, getTask, selectedtask, updateTask} = tasksContext;
    const [task, setTask] = useState({
        name: ''
    });
    const { name } = task;

    useEffect(() => {
        if(selectedtask !== null) {
            setTask(selectedtask);
        } else {
            setTask({
                name: ''
            });
        }
    }, [selectedtask]);

    if(!proyect) return null;

    const [actualProyect] = proyect;

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        //validar
        if(name.trim() === '') {
            validateTask();
            return;
        }
        //reviion de edicion o nueva tarea
        if(selectedtask === null) {
            //pasarlo al context
            //Agregar la tarea al state de tareas
            task.proyect = actualProyect._id;
            addTask(task);
        } else {
            //actualiza la tarea desde el reducer
            updateTask(task);
        }

        //filtramos nuevamente la lista de tareas para que se actualice con la nueva
        getTask(actualProyect.id);

        //reiniciar el form
        setTask({
            name: ''
        })
    }

    return ( 
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input
                    value={name}
                    onChange={handleChange}
                    className="input-text"
                    type="text" 
                    placeholder="Nombre de la tarea"
                    name="name"  
                    />
                </div>
                <div className="contenedor-input">
                    <input
                    className="btn btn-primario btn-submit btn-block"
                    type="submit"
                    value={selectedtask ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {taskerror ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTask;