import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/Alertas/alertaContext';
import AuthContext from '../../context/Auth/authContext';

const NewAccount = (props) => {
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { registerUser, message, authenticated } = authContext;

    //SI EL USUARIO SE HA REGISTRADO CON EXITO O NO
    useEffect(() => {
        if(authenticated){
            props.history.push('/proyects');
        }
        if(message){
            mostrarAlerta(message.msg, message.category);
        }
    } , [message, authenticated, props.history, mostrarAlerta]);

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });
    const { name, email, password, confirm } = newUser;

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //validar campos vacios
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //Validar que el pass tenga 8 caracteres 
        if(password.length < 8){
            mostrarAlerta('El password debe tener al menos 8 caracteres', 'alerta-error');
            return;
        }
        //Validar que el pass y el confirm coincidan
        if(password !== confirm){
            mostrarAlerta('Los passwords no coinciden', 'alerta-error');
            return;
        }
        //pasarlo al action
        //console.log(newUser);
        registerUser({name, email, password});
    }

    return (
        <div className="form-usuario">
        { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener Mi cuenta</h1>
                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Tu Nombre"
                            value={name}
                            onChange={handleChange}
                        />

                    </div>

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
                        <label htmlFor="confirm">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Confirma tu Password"
                            value={confirm}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="campo-form">
                        <button
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"
                        >
                            Registrarse</button>
                    </div>
                </form>

                <Link to={"/"} className="enlace-cuenta">Iniciar Sesión</Link>
            </div>
        </div>
    );
}

export default NewAccount;