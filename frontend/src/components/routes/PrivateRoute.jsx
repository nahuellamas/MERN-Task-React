import { useContext , useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext  from '../../context/Auth/authContext';

//higher order components

const PrivateRoute = ({ component: Component, ...props}) => {
    const authContext = useContext(AuthContext);
    const { loginUser, authenticated, loading} = authContext;

    useEffect(() => {
        loginUser();
        // eslint-disable-next-line
    } , []);
    return(
        <Route {...props} render={props => !authenticated && !loading ? ( 
            <Redirect to="/" />
        ) :  (
            <Component {...props} />
        ) } />
     );
};

export default PrivateRoute;
