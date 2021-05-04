import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import storeApi from '../../../api/store-api';

const storeSlide = createSlice({
    name: 'store',
    initialState: {
        loading: true,
        stores: {},
        page: 1,
        limit: 10,
        name: '',
        sort: 'createAt',
        direction: 'desc',
    },
    reducers: {
        loadStoresStart(state) {
            state.loading = true;
        },
        loadStoresSuccess(state, action) {
            state.stores = action.payload;
            state.loading = false;
        },
        loadStoresFailed(state) {
            state.loading = false;
        },
        updateSort(state, action) {
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.sort = action.payload.sort;
            state.direction = action.payload.direction;
        },
        searchStore(state, action) {
            state.name = action.payload;
        },
    },
});

const { actions, reducer } = storeSlide;

export const {
    loadStoresStart,
    loadStoresSuccess,
    loadStoresFailed,
    updateSort,
    searchStore,
} = actions;

export const loadStores = () => async (dispatch: any, getState: any) => {
    try {
        const state = getState();
        const data = pick(state.store, ['page', 'limit', 'name', 'sort', 'direction']);
        dispatch(loadStoresStart());
        const response = await storeApi.loadStores(data);

        dispatch(loadStoresSuccess(response));
    } catch (err) {
        dispatch(loadStoresFailed());
    }
};

export default reducer;
