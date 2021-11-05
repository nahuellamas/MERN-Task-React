import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login  from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Proyects from './components/proyectos/Proyects';
import ProyectState from './context/Proyectos/proyectState';
import TaskState from './context/Tasks/taskState';
import AlertState from './context/Alertas/alertaState';
import AuthState from './context/Auth/authState';
import tokenAuth from './config/token';
import PrivateRoute from './components/routes/PrivateRoute';

//revisar si hay token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  return (
    <ProyectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              {/*Aqui se coloca el componente que se va a renderizar en toda la web*/}

              <Switch>
                {/*Aqui se ve en las diferentes paginas links*/}
                  <Route exact path="/" component={Login} />
                  <Route exact path="/new-account" component={NewAccount} />
                  <PrivateRoute exact path="/proyects" component={Proyects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProyectState>
  );
}

export default App;
