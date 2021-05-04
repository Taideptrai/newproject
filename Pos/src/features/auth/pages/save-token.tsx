import { message } from 'antd';
import * as queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IToken, setToken } from '../../../api/token';
import { Loading } from '../../../components';
import { BaseLayout } from '../../../layout';
import { loadUser } from '../state/auth-slide';

interface Props {}

const SaveToken = (props: Props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const searchState: {
        token?: string;
        remember?: string;
        location?: string;
    } = queryString.parse(history.location.search);

    const saveAndLoadUser = async (): Promise<void> => {
        const { token, remember, location } = searchState;

        if (!token || !location) {
            return;
        }
        const rememberValue = remember === 'true';
        const tokenValue: IToken = JSON.parse(token);
        const locationValue: Location = JSON.parse(location);

        await setToken({ token: tokenValue, remember: rememberValue });
        await dispatch(loadUser());
        message.success('Đăng nhập thành công');

        if (locationValue.pathname.includes('/auth')) {
            history.replace('/dashboard/sales-counters');
            return;
        }

        history.replace(locationValue);
    };

    useEffect(() => {
        saveAndLoadUser();
    }, []);

    return (
        <BaseLayout title='Login'>
            <Loading full />
        </BaseLayout>
    );
};

export default SaveToken;
