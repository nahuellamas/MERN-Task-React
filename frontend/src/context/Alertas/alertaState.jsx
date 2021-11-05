import { useReducer } from "react"; 
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContext";

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertState = props => {
    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState);


    //funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 3000);
    };
    return (
        <alertaContext.Provider
            value={{
                mostrarAlerta,
                alerta: state.alerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
};

export default AlertState;