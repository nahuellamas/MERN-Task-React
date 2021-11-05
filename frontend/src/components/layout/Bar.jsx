import {useContext, useEffect} from 'react';
import AuthContext from '../../context/Auth/authContext';

const Bar = ({conectedUser}) => {
    //extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { loginUser, user, logout } = authContext;

    useEffect(() => {
        loginUser();
        // eslint-disable-next-line
    } , []);
    


    return ( 
        <header className="app-header">
            {user ? <p className="nombre-usuario">hola <span>{user.name}</span></p> : null}
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => logout()}>
                Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Bar;