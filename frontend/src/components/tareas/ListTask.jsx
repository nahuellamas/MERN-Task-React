import { Fragment, useContext } from "react";
import Task from '../tareas/Task';
import proyectContext from '../../context/Proyectos/proyectContext'
import taskContext from '../../context/Tasks/taskContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListTask = () => {
    const proyectsContext = useContext(proyectContext);
    const { proyect, deleteProyect } = proyectsContext;

    const tasksContext = useContext(taskContext);
    const {taskproyect} = tasksContext;

    if(!proyect){
        return <h2>Elegí tu proyecto</h2>;
    }
    const [actualProyect] = proyect; //posicion uno del array

    return (
        <Fragment>
        <h2>Proyecto: {actualProyect.name}</h2>
        <ul className="listado-tareas">
            {taskproyect.length === 0 
            ? (<li className="tarea"><p>No hay tareas</p></li>)
            :   <TransitionGroup>
                {taskproyect.map(task => (
                    <CSSTransition key={task.id} timeout={500} classNames="item">
                        <Task task={task} />
                    </CSSTransition>
                ))}
                </TransitionGroup>
            }
        </ul>

        <button
            onClick={ () => deleteProyect(actualProyect._id)}
            type="button"
            className="btn btn-eliminar"
        >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListTask;