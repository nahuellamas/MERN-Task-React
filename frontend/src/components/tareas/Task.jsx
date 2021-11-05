import { useContext } from 'react';
import taskContext from '../../context/Tasks/taskContext';
import proyectContext from '../../context/Proyectos/proyectContext'


const Task = ({task}) => {
    const proyectsContext = useContext(proyectContext);
    const { proyect } = proyectsContext;
    const [actualProyect] = proyect;

    const tasksContext = useContext(taskContext);
    const {deleteTask, getTask, updateTask, actualtask} = tasksContext;

    const taskDelete = id => {
        deleteTask(id, actualProyect._id);
        getTask(actualProyect.id);
    }

    const taskStatus = task => {
        if(task.status){
            task.status = false;
        } else {
            task.status = true;
        }
        updateTask(task);
    }

    const taskActual = task => {
        actualtask(task);
    }

    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.status
                ? (<button type="button" onClick={() => taskStatus(task)} className="completo">Completado</button>)
                : (<button type="button" onClick={() => taskStatus(task)} className="incomleto">Incompleto</button>) }
            </div>
            <div className="acciones">
                    <button onClick={() => taskActual(task)} type="button" className="btn btn-primario">Editar</button>
                    <button onClick={() => taskDelete(task._id)} type="button" className="btn btn-secundario">Eliminar</button>
            </div>
        </li>
     );
}
 
export default Task;