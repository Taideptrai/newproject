import { ConnectedRouter } from 'connected-react-router';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Loading } from '../components';
import CreateStore from '../pages/create-store';
import { getUserAction } from '../reducers/authState/authAction';
import { IStorageState } from '../reducers/authState/authReducer';
import { history } from '../store';
import { IState } from '../store/rootReducer';

const AuthPage = lazy(() => import('../pages/auth-page/AuthPage'));
const Dashboard = lazy(() => import('../pages/dashboard'));

interface AuthState {
    auth: IStorageState;
}

function AppRouter() {
    const dispatch = useDispatch();
    const isAuth = useSelector(({ auth }: AuthState) => auth.isAuth);
    const loading = useSelector(({ auth }: AuthState) => auth.loading);
    const store = useSelector((state: IState) => state.store.data);

    useEffect(() => {
        if (isAuth) {
            dispatch(getUserAction());
        }
    }, []);

    if (loading && isAuth) {
        return <Loading full />;
    }

    return (
        <Router forceRefresh={true}>
            <Suspense fallback={<Loading full />}>
                <ConnectedRouter history={history}>
                    <Route
                        render={() => {
                            if (isAuth) {
                                if (!store._id) return <CreateStore />;

                                return <Dashboard />;
                            }

                            return <AuthPage />;
                        }}
                        path="/"
                    />
                </ConnectedRouter>
            </Suspense>
        </Router>
    );
}

export default AppRouter;
