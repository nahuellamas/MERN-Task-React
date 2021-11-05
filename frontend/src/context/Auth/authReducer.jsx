import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';


const authReducer = (state, action) => {
switch (action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            authenticated: true,
            message: null,
            loading: false
        }
    case OBTENER_USUARIO:
        return {
            ...state,
            authenticated: true,
            user: action.payload,
            loading: false
        }
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
        localStorage.removeItem('token');
        return {
            ...state,
            authenticated: false,
            token: null,
            message: action.payload,
            loading: false
        }
    case CERRAR_SESION:
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            authenticated: false,
            user: null,
            loading: false
        }
    default: 
        return state;
    }
}

export default authReducer;