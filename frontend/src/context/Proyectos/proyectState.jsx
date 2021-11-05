import {useReducer} from 'react';
import proyectContext from './proyectContext';
import proyectReducer from './proyectReducer';
import {FORM_PROYECT, 
    GET_PROYECTS,
    ADD_PROYECT,
    SHOW_ERROR,
    ACTUAL_PROYECT,
    DELETE_PROYECT,
    ERROR_PROYECT
        } from '../../types/index';

import ClientAxios from '../../config/Axios';


const ProyectState = props => {

    const initialState = {
        form: false,
        proyects: [],
        errorform: false,
        proyect: null,
        msg: null
    }
    //dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectReducer, initialState);

    //funciones para el CRUD
    const mostrarForm = () => {
        dispatch({
            type: FORM_PROYECT
        })
    };

    const getProyects = async () => {
        try {
            const response = await ClientAxios.get('http://localhost:5000/api/proyects');
            console.log(response);
            dispatch({
                type: GET_PROYECTS,
                payload: response.data.proyects
            })
        } catch (error) {
            const alert = {
                msg: 'Error No se pudieron cargar los Proyectos',
                category: 'alerta-error'
           }
           dispatch({
                type: ERROR_PROYECT,
                payload: alert
           })
        }
    };

    const addProyect = async proyect => {
        try {
            const response = await ClientAxios.post('http://localhost:5000/api/proyects', proyect);
            console.log(response);
            dispatch({
                type: ADD_PROYECT,
                payload: response.data
            })
        } catch (error) {
            const alert = {
                msg: 'Error No se pudo agregar el proyecto',
                category: 'alerta-error'
           }
           dispatch({
                type: ERROR_PROYECT,
                payload: alert
           })
        }
    }

    const showError = () => {
        dispatch({
            type: SHOW_ERROR
        })
    }

    const selectProyect = proyectid => {
        dispatch({
            type: ACTUAL_PROYECT,
            payload: proyectid
        })
    }

    const deleteProyect = async proyectid => {
       try {
        const response = await ClientAxios.delete(`http://localhost:5000/api/proyects/${proyectid}`);
        console.log(response);
        dispatch({
            type: DELETE_PROYECT,
            payload: proyectid
        })
       } catch (error) {
           const alert = {
                msg: 'Error al eliminar el proyecto',
                category: 'alerta-error'
           }
           dispatch({
                type: ERROR_PROYECT,
                payload: alert
           })
       }
    }

    return (
        <proyectContext.Provider 
            value={{
                form: state.form,
                mostrarForm,
                proyects: state.proyects,
                getProyects,
                addProyect,
                errorform: state.errorform,
                showError,
                proyect: state.proyect,
                selectProyect,
                deleteProyect,
                msg: state.msg
            }}
        >
            {props.children}
        </proyectContext.Provider>
    )


};

export default ProyectState;