import React, {FC, useEffect, useState, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {refreshAccessToken} from '../api';
import {
    checkToken,
    getToken,
    getTokenLocal,
    removeToken,
    setToken,
    IToken,
} from '../api/token';
import {Loading, NotFound} from '../components';
import {useProgress} from '../hooks';

const Auth = lazy(() => import('../features/auth'));

interface Props {}

const AppRouter: FC = () => {
    const loading = useProgress();

    if (loading) {
        return <Loading full />;
    }
    return (
        <Switch>
            <Route path="/">
                <Auth />
            </Route>
            <Route component={NotFound} />
        </Switch>
    );
};

const Routes: FC<Props> = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadToken() {
            try {
                setLoading(true);

                const accessToken = getToken('accessToken');

                if (!accessToken) {
                    removeToken();
                    setLoading(false);
                    return;
                }

                const isValidAccessToken = checkToken(accessToken);

                if (!isValidAccessToken) {
                    const refreshToken = getToken('refreshToken');

                    if (!refreshToken) {
                        removeToken();
                        setLoading(false);
                        return;
                    }

                    const isValidRefreshToken = checkToken(refreshToken);

                    if (!isValidRefreshToken) {
                        removeToken();
                        setLoading(false);
                        return;
                    }

                    const responseAccessToken = await refreshAccessToken(
                        refreshToken,
                    );
                    const token = getTokenLocal();
                    const newToken = {
                        ...(token as IToken),
                        accessToken: responseAccessToken.accessToken,
                    };

                    setToken({
                        token: newToken,
                        remember: true,
                    });
                    setLoading(false);
                    return;
                }

                setLoading(false);
                return;
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
        loadToken();
    }, []);

    if (loading) {
        return <Loading full />;
    }

    return (
        <Suspense fallback={<Loading full />}>
            <Router>
                <AppRouter />
            </Router>
        </Suspense>
    );
};

export {Routes};
