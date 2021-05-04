import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import { message } from 'antd';
import fanpageApi from '../../../api/fanpage-api';

const fanpageSlide = createSlice({
    name: 'fanpage',
    initialState: {
        loading: true,
        fanpage: {},
        page: 1,
        limit: 10,
        name: '',
        sort: 'createdAt',
        direction: 'desc',
    },
    reducers: {
        loadFanpageStart(state) {
            state.loading = true;
        },
        loadFanpageSuccess(state, action) {
            state.fanpage = action.payload;
            state.loading = false;
        },
        loadFanpageFailed(state) {
            state.loading = false;
        },
        updateSort(state, action) {
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.sort = action.payload.sort;
            state.direction = action.payload.direction;
        },
        searchFanpage(state, action) {
            state.name = action.payload;
        },
    },
});

const { actions, reducer } = fanpageSlide;

export const {
    loadFanpageStart,
    loadFanpageSuccess,
    loadFanpageFailed,
    updateSort,
    searchFanpage,
} = actions;

export const loadFanpage = () => async (dispatch: any, getState: any) => {
    try {
        const state = getState();
        const data = pick(state.fanpage, ['page', 'limit', 'name', 'sort', 'direction']);
        dispatch(loadFanpageStart());
        const response = await fanpageApi.loadFanpage(data);

        dispatch(loadFanpageSuccess(response));
    } catch (err) {
        dispatch(loadFanpageFailed());
    }
};

export const updateFanpage = (dataPut: any) => async (dispatch: any, getState: any) => {
    try {
        const response = await fanpageApi.updateFanpageRequest(dataPut);
        message.success('Cập nhật thành công');
    } catch (err) {
        console.log(err);
        dispatch(loadFanpageFailed());
    }
};

export default reducer;
