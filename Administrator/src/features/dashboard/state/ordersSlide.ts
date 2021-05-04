import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import orderApi from '../../../api/order-api';

const OrderSlide = createSlice({
    name: 'store',
    initialState: {
        loading: true,
        orders: { data: [], total: 0 },
        page: 1,
        limit: 10,
        name: '',
        sort: 'createAt',
        direction: 'desc',
    },
    reducers: {
        loadOrdersStart(state) {
            state.loading = true;
        },
        loadOrdersSuccess(state, action) {
            state.orders = action.payload;
            state.loading = false;
        },
        loadOrdersFailed(state) {
            state.loading = false;
        },
        updateSort(state, action) {
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.sort = action.payload.sort;
            state.direction = action.payload.direction;
        },
    },
});

const { actions, reducer } = OrderSlide;

export const { loadOrdersStart, loadOrdersSuccess, loadOrdersFailed, updateSort } = actions;

export const loadOrders = (storeId: string) => async (dispatch: any, getState: any) => {
    try {
        const state = getState();
        const data = pick(state.store, ['page', 'limit', 'name', 'sort', 'direction']);
        dispatch(loadOrdersStart());
        const response = await orderApi.loadOrders(storeId, data);

        dispatch(loadOrdersSuccess(response));
    } catch (err) {
        dispatch(loadOrdersFailed());
    }
};

export default reducer;
