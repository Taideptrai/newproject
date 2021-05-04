import React, {FC, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {getToken} from '../api';
import {Loading, NotFound} from '../components';
import {useAuth} from '../context';
import {GuestRouter, UserRouter} from './hoc-router';

const Homepage = lazy(() => import('../features/homepage'));
const Auth = lazy(() => import('../features/auth'));
const Dashboard = lazy(() => import('../features/dashboard'));

interface Props {}

const Routes: FC<Props> = () => {
    const {loading} = useAuth();
    const token = getToken();

    if (token && loading) {
        return <Loading full />;
    }
    return (
        <Suspense fallback={<Loading full />}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage} />

                    <GuestRouter path="/auth">
                        <Auth />
                    </GuestRouter>
                    <UserRouter path="/dashboard">
                        <Dashboard />
                    </UserRouter>
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Suspense>
    );
};

export {Routes};
