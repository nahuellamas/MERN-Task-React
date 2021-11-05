import {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/Alertas/alertaContext';
import AuthContext from '../../context/Auth/authContext';

const Login = (props) => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { login, message, authenticated } = authContext;

    //SI EL USUARIO O PASSWORD NO EXISTEN validacion muestra la alerta
    useEffect(() => {
        if(authenticated){
          props.history.push('/proyects');
        }
        if(message){
            mostrarAlerta(message.msg, message.category);
        }
    } , [message, authenticated, props.history, mostrarAlerta]);

    const [user, setUser ] = useState({
        email: '',
        password: ''
    });
    const {email, password} = user;

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //validar campos vacios
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //pasarlo al action
        login({email, password})
    }


    return ( 
        <div className="form-usuario">
                { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Tu Email"
                            value={email}
                            onChange={handleChange}
                        />
                    
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Tu Password"
                            value={password}
                            onChange={handleChange}
                        />
                    
                    </div>

                    <div className="campo-form">
                        <button 
                        type="submit" 
                        className="btn btn-primario btn-block"
                        value="Iniciar Sesion"
                        >
                        Iniciar Sesión</button>
                    </div>
                </form>

                <Link to={"/new-account"} className="enlace-cuenta">Crear cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;