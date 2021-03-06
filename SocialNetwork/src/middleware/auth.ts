import { push } from 'connected-react-router';
import axios from 'axios';

import authTypes from '../reducers/authState/authTypes';
import { ReduxAction } from '../types';

export const onApiUnauthenticated = () => (next: any) => (action: ReduxAction) => {
    if (action.type === 'API_UNAUTHENTICATED') {
        return next(push('/login'));
    }

    return next(action);
};

export const onAuthSuccess = () => (next: any) => (action: ReduxAction) => {
    if (action.type === authTypes.LOGIN_SUCCESSS) {
        const { accessToken, type } = action.payload;

        axios.defaults.headers.common.Authorization = `${type} ${accessToken}`;
    } else if (action.type === authTypes.LOGIN_FAILED) {
        delete axios.defaults.headers.Authorization;
    }

    return next(action);
};

export const checkAuthOnRehydrate = () => (next: any) => (action: ReduxAction) => {
    if (action.type === 'persist/REHYDRATE') {
        if (action.payload && action.payload.auth && action.payload.auth.token) {
            const { token } = action.payload.auth;
            axios.defaults.headers.common.Authorization = `${token.type} ${token.accessToken}`;
        } else {
            delete axios.defaults.headers.Authorization;
        }
    }
    return next(action);
};
