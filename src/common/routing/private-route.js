import React from 'react';
import  authenticationService from '../../shared/services/authentication-service/authentication-service';
import { Route, Redirect } from 'react-router-native'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authenticationService.isAuthenticated() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

export default PrivateRoute;