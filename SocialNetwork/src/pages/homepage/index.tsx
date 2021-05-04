import * as queryString from 'query-string';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Element } from 'react-scroll';
import { Loading } from '../../components';
import constants from '../../constants';
import { DefaultLayout } from '../../layout';
import { IAuthState } from '../../reducers/authState/authReducer';
import Banner from './banner';
import DetailFunction from './detail-function';
import FormSubscride from './form-subscride';
import Functions from './functions';
import Integration from './integration';
import './style.less';

interface Props {
    title?: string;
}

const Homepage: FC<Props> = ({ title = constants.title }): JSX.Element => {
    const loading = useSelector(({ auth }: { auth: IAuthState }) => auth.loading);
    const isAuth = useSelector(({ auth }: { auth: IAuthState }) => auth.isAuth);
    const location = useLocation();

    useEffect(() => {
        if (!isAuth) {
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
                isLogout: false,
                guest: true,
                saleChannel: 'facebook',
            });

            window.location.href = `${constants.URL_AUTH}login?${search}`;
        }
    }, [isAuth, location.state]);

    if (loading) {
        return <Loading full />;
    }

    return (
        <DefaultLayout title={title}>
            <Banner />
            <Element name='tinh_nang'>
                <Functions />
            </Element>
            <DetailFunction />
            <Integration />
            <FormSubscride />
        </DefaultLayout>
    );
};

export default Homepage;
