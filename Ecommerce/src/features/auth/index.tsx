import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import React, {FC, lazy} from 'react';
import {NotFound} from '../../components';

const Login = lazy(() => import('./pages/login'));
const SaveToken = lazy(() => import('./pages/save-token'));

const Auth: FC = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Redirect exact from={match.url} to={`${match.url}/login`} />
            <Route component={Login} path={`${match.url}/login`} />
            <Route component={SaveToken} path={`${match.url}/save-token`} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Auth;
