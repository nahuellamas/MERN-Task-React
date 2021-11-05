import { useContext, useEffect } from "react";
import proyectContext from "../../context/Proyectos/proyectContext";
import taskContext from "../../context/Tasks/taskContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertaContext from '../../context/Alertas/alertaContext';

const ListProyects = () => {
  const proyectsContext = useContext(proyectContext);
  const { msg, proyects, getProyects, selectProyect } = proyectsContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const tasksContext = useContext(taskContext);
  const { getTask } = tasksContext;

  useEffect(() => {
    //si hay un error
    if (msg) {
      mostrarAlerta(msg.msg, msg.category);
    }
    getProyects();
    // eslint-disable-next-line
  }, [msg]);
  //los useeffect se ejecutan cuando el componente se monta y cuando se desmonta
  //los condicionales siempre abajo de todo
  if (proyects.length === 0) {
    return (
      <p className="mensaje">
        No tienes Proyectos, crea todos los que necesites!
      </p>
    );
  }

  const proyectoSeleccionado = (id) => {
    selectProyect(id); //fijar el proyecto
    getTask(id); //obtener las tareas del proyecto seleccionado
  };

  return (
    <ul className="listado-proyectos">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <TransitionGroup>
        {proyects.map((proyect) => (
          <CSSTransition key={proyect._id} classNames="item" timeout={500}>
            <li>
              <button
                onClick={() => proyectoSeleccionado(proyect._id)}
                type="button"
                className="btn btn-black"
              >
                {proyect.name}
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListProyects;
