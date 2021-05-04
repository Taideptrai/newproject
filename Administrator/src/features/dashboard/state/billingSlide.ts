import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import storeApi from '../../../api/store-api';

const billingSlide = createSlice({
    name: 'billing',
    initialState: {
        loading: true,
        billings: {},
        page: 1,
        limit: 10,
        name: '',
        sort: 'createAt',
        direction: 'desc',
        reset: false,
    },
    reducers: {
        loadBillingsStart(state) {
            state.loading = true;
        },
        loadBillingsSuccess(state, action) {
            state.billings = action.payload;
            state.loading = false;
        },
        loadBillingsFailed(state) {
            state.loading = false;
        },
        updateSort(state, action) {
            state.page = action.payload.page;
            state.limit = action.payload.limit;
            state.sort = action.payload.sort;
            state.direction = action.payload.direction;
        },
        searchBilling(state, action) {
            state.name = action.payload;
        },
        resetBlillings(state, action) {
            state.page = 1;
            state.reset = !state.reset;
        }
    },
});

const { actions, reducer } = billingSlide;

export const {
    loadBillingsStart,
    loadBillingsSuccess,
    loadBillingsFailed,
    updateSort,
    searchBilling,
    resetBlillings,
} = actions;

export const loadBillings = () => async (dispatch: any, getState: any) => {
    try {
        const state = getState();
        const data = pick(state.billing, ['page', 'limit', 'name', 'sort', 'direction']);
        dispatch(loadBillingsStart());
        const response = await storeApi.loadNewBillings(data);

        dispatch(loadBillingsSuccess(response));
    } catch (err) {
        dispatch(loadBillingsFailed());
    }
};

export default reducer;
