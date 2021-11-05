import { Fragment, useState, useContext } from "react";
import proyectContext from '../../context/Proyectos/proyectContext'

const NewProyect = () => {

    //State para nuevo proyecto
    const proyectsContext = useContext(proyectContext);
    const {form, mostrarForm, addProyect, errorform, showError} = proyectsContext;

    const [proyect, setProyect] = useState({
        name: '',
    });

    const { name } = proyect;
    
    const handleChange = (e) => {
        setProyect({
            ...proyect,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitProyect = (e) => {
        e.preventDefault();
        //validar el proyecto
        if(name === '') {
            showError();
            return;
        }
        //agregar al state
        addProyect(proyect);
        //reiniciar el form
        setProyect({
            name: ''
        });
    };

    return ( 
        <Fragment>
        <button 
            onClick={mostrarForm}
            type="button"
            className="btn btn-block btn-primario"
            >
            Nuevo Proyecto
        </button>
        { form ?
            (<form onSubmit={onSubmitProyect} className="formulario-nuevo-proyecto">
                <input 
                    onChange={handleChange}
                    value={name}
                    type="text"
                    className="input-text"
                    placeholder="Nombre del Proyecto"
                    name="name"
                />
                <input 
                    type="submit"
                    className="btn btn-block btn-primario"
                    value="Agregar Proyecto"
                />
            </form>)
        : null}
        {errorform ? <p className="mensaje error">El nombre del Proyecto es Obligatorio</p> : null}
        </Fragment>
     );
}
 
export default NewProyect;