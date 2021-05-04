import * as queryString from 'query-string';
import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Loading} from '../../../components';
import {URL_AUTH} from '../../../constants';
import {BaseLayout} from '../../../layout';
import {useAuth} from '../../../context';

const Login = () => {
    const location = useLocation();
    const {isLogout} = useAuth();

    useEffect(() => {
        const lastState: any = location.state;
        let lastLocation = lastState?.from;
        if (!lastLocation?.pathname) {
            lastLocation = {
                pathname: '/dashboard/overview',
            };
        }

        const search = queryString.stringify({
            url: `${window.location.origin}/auth/save-token`,
            location: JSON.stringify(lastLocation),
            isLogout,
        });
        window.location.href = `${URL_AUTH}login?${search}`;
    }, []);

    return (
        <BaseLayout title="Login">
            <Loading full />
        </BaseLayout>
    );
};

export default Login;
