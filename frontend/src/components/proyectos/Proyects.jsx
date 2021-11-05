import { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import FormTask from '../tareas/FormTask';
import ListTask from '../tareas/ListTask';
import AuthContext from '../../context/Auth/authContext';

//CON ESTO MANTENGO INICIADA LA SESION
const Proyects = () => {
    //extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { loginUser } = authContext;

    useEffect(() => {
        loginUser();
        // eslint-disable-next-line
    } , []);
    
    return ( 
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Bar 
                conectedUser="Usuario"
                />
                <main>
                    <FormTask />
                    <div className="contenedor-tareas">
                        <ListTask />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyects;