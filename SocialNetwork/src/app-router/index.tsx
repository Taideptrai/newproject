import { ConnectedRouter } from 'connected-react-router';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Loading } from '../components';
import { getUserAction } from '../reducers/authState/authAction';
import { IAuthState } from '../reducers/authState/authReducer';
import { history } from '../store';
import { CustomerRouter, GuestRouter, UserRouter } from './auth-router';

const Homepage = lazy(() => import('../pages/homepage'));
const Login = lazy(() => import('../pages/login'));
const Signup = lazy(() => import('../pages/signup'));
const Customer = lazy(() => import('../pages/customer'));
const CreateStore = lazy(() => import('../pages/create-store'));
const ConnectFacebook = lazy(() => import('../pages/connect-facebook'));
const NotFound = lazy(() => import('../pages/not-found'));
const SaveToken = lazy(() => import('../pages/save-token'));
const NoChannel = lazy(() => import('../pages/no-channel'));

export interface AuthState {
    auth: IAuthState;
}

function AppRouter(): JSX.Element {
    const dispatch = useDispatch();

    const isAuth = useSelector(({ auth }: AuthState) => auth.isAuth);
    const loading = useSelector(({ auth }: AuthState) => auth.loading);

    useEffect(() => {
        if (isAuth) {
            dispatch(getUserAction());
        }
    }, []);

    if (loading && isAuth) return <Loading full />;

    return (
        <Router>
            <Suspense fallback={<Loading full />}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route component={Homepage} path='/' exact />

                        <GuestRouter path='/login'>
                            <Login />
                        </GuestRouter>
                        <GuestRouter path='/save-token'>
                            <SaveToken />
                        </GuestRouter>
                        <GuestRouter path='/signup'>
                            <Signup />
                        </GuestRouter>

                        <CustomerRouter path='/customer'>
                            <Customer />
                        </CustomerRouter>

                        <UserRouter path='/create-store'>
                            <CreateStore />
                        </UserRouter>

                        <Route path='/no-channel'>
                            <NoChannel />
                        </Route>

                        <UserRouter path='/connect-fanpage'>
                            <ConnectFacebook />
                        </UserRouter>

                        <Route path='/page-not-found' component={NotFound} />
                        <Redirect to='/page-not-found' />
                    </Switch>
                </ConnectedRouter>
            </Suspense>
        </Router>
    );
}

export default AppRouter;
