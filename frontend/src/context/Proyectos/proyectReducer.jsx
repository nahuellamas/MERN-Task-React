import { FORM_PROYECT, 
    GET_PROYECTS,
    ADD_PROYECT,
    SHOW_ERROR,
    ACTUAL_PROYECT,
    DELETE_PROYECT,
    ERROR_PROYECT
    } from '../../types/index';

//Aque tenemos las condiciones de nuestro State
const alertProyect = (state, action) => {
    switch (action.type) {
        case FORM_PROYECT:
            return {
                ...state,
                form: true
            }
        case GET_PROYECTS:
            console.log(action.payload);
            return {
                ...state,
                proyects: action.payload
            }
        case ADD_PROYECT:
            return {
                ...state,
                proyects: [ action.payload, ...state.proyects],
                form: false,
                errorform: false
            }
        case SHOW_ERROR:
            return {
                ...state,
                errorform: true
            }
        case ACTUAL_PROYECT:
            return {
                ...state,
                proyect: state.proyects.filter(proyect => proyect._id === action.payload)
            }
        case DELETE_PROYECT:
            return {
                ...state,
                proyects: state.proyects.filter(proyect => proyect._id !== action.payload),
                proyect: null
            }
        case ERROR_PROYECT:
            return{
                ...state,
                msg: action.payload
            }
        default: 
            return state;
    }
}

export default alertProyect;