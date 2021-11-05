import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/Axios';
import tokenAuth from '../../config/token';
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),//guardamos el token en el localstorage
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //funciones
    const registerUser = async data => {
        try {
            const response = await clientAxios.post('http://localhost:5000/api/users', data);
            console.log(response);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data
            });

            //obtener usuario
            loginUser();
        } catch (error) {
            console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alert
            });
        }
    };

    const loginUser = async () => {
        const token = localStorage.getItem('token');
         if(token){
             // funcion para enviar el token en el header
            tokenAuth(token);
         }
         try {
             const response = await clientAxios.get('http://localhost:5000/api/auth');
             console.log(response);
                dispatch({
                    type: OBTENER_USUARIO,
                    payload: response.data.user
                });
         } catch (error) {
             console.log(error.response);
             dispatch({
                    type: LOGIN_ERROR,
                });
         }
    };
    
    //inicio de sesion 
    const login = async data => {
        try {
            const response = await clientAxios.post('http://localhost:5000/api/auth', data);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: response.data
            })
            //obtener usuario
            loginUser();
        } catch (error) {
            console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        }
    }

    //cerrar sesion
    const logout = () => {
        dispatch({
            type: CERRAR_SESION,
        });
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                registerUser,
                loginUser,
                login,
                logout,
                loading: state.loading
            }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;