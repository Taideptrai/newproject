import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import userApi from '../../../api/user-api';

const userSlide = createSlice({
    name: 'user',
    initialState: {
        loading: true,
        user: {},
        page: 1,
        limit: 10,
        search: '',
        sort: 'createAt',
        direction: 'desc',
    },
    reducers: {
        loadUsersStart(state) {
            state.loading = true;
        },
        loadUsersSuccess(state, action) {
            state.user = action.payload;
            state.loading = false;
        },
        loadUsersFailed(state) {
            state.loading = false;
        },
        updateSort(state, action) {
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.sort = action.payload.sort;
            state.direction = action.payload.direction;
        },
        searchUser(state, action) {
            state.search = action.payload;
        },
    },
});

const { actions, reducer } = userSlide;

export const {
    loadUsersStart,
    loadUsersSuccess,
    loadUsersFailed,
    updateSort,
    searchUser,
} = actions;

export const loadUsers = () => async (dispatch: any, getState: any) => {
    try {
        const state = getState();
        const data = pick(state.user, ['page', 'limit', 'search', 'sort', 'direction']);
        dispatch(loadUsersStart());
        const response = await userApi.loadUsers(data);

        dispatch(loadUsersSuccess(response));
    } catch (err) {
        dispatch(loadUsersFailed());
    }
};

export default reducer;
