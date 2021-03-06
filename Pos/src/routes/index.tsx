import React, { FC, lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { getToken } from '../api/token';
import { Loading, NotFound } from '../components';
import { loadUser } from '../features/auth/state/auth-slide';
import { GuestRouter, UserRouter } from './hoc-route';

const Dashboard = lazy(() => import('../features/dashboard'));
const Auth = lazy(() => import('../features/auth'));

interface Props {}

const Routes: FC<Props> = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.auth.loading);
    const token = getToken();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    if (loading && token) return <Loading full />;

    return (
        <Suspense fallback={<Loading full />}>
            <Router>
                <Switch>
                    <Redirect exact from='/' to={`/dashboard`} />
                    <UserRouter path='/dashboard'>
                        <Dashboard />
                    </UserRouter>

                    <GuestRouter path='/auth'>
                        <Auth />
                    </GuestRouter>

                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Suspense>
    );
};

export default Routes;
