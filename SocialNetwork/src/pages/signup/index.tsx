import * as queryString from 'query-string';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loading } from '../../components';
import constants from '../../constants';
import { AuthLayout } from '../../layout';

const title = 'Đăng ký';

function SignUp(): JSX.Element {
    const location = useLocation();

    useEffect(() => {
        const lastState: any = location.state;
        let lastLocation = lastState?.from;

        if (!lastLocation?.pathname) {
            lastLocation = {
                pathname: '/',
            };
        }
        const search = queryString.stringify({
            url: `${window.location.origin}/save-token`,
            location: JSON.stringify(lastLocation),
            isLogout: true,
            saleChannel: 'facebook',
        });
        window.location.href = `${constants.URL_AUTH}sign-up?${search}`;
    }, []);

    return (
        <AuthLayout title={title}>
            <Loading full />
        </AuthLayout>
    );
}

export default SignUp;
