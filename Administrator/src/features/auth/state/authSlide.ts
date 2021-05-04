import { createSlice } from '@reduxjs/toolkit';
import authApi from '../../../api/auth-api';

export interface IAuth {
    loading: boolean;
    isAuth: boolean;
    isLogout: boolean;
    user: any;
}

const authSlide = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuth: false,
        isLogout: false,
        user: null,
    },
    reducers: {
        loadUserStart(state) {
            state.loading = true;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.isAuth = true;
            state.isLogout = false;
        },
        loadUserFailed(state) {
            localStorage.removeItem('token');

            state.loading = false;
            state.user = null;
            state.isAuth = false;
            state.isLogout = true;
        },
        logout(state) {
            localStorage.removeItem('token');

            state.loading = false;
            state.user = null;
            state.isAuth = false;
            state.isLogout = true;
        },
    },
});

const { actions, reducer } = authSlide;

export const { loadUserStart, loadUserSuccess, loadUserFailed, logout } = actions;

export const loadUser = () => async (dispatch: any) => {
    try {
        dispatch(loadUserStart());
        const response = await authApi.getUser();

        if (response.permissions && (response.permissions as string[]).includes('administrator')) {
            return dispatch(loadUserSuccess(response));
        }

        return dispatch(loadUserFailed());
    } catch (err) {
        dispatch(loadUserFailed());
    }
};

export default reducer;
