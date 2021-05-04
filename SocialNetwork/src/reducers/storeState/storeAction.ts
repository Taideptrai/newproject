import { Dispatch } from 'redux';

import storeApi from '../../api/store-api';
import { IAction, Store } from './storeReducer';
import types from './storeTypes';

export function loadingStore(): IAction {
    return { type: types.LOADING_STORE };
}

export function loadStoreFaild(): IAction {
    return { type: types.LOAD_STORE_FAILED };
}

export function loadStoreSuccess(store: Store): IAction {
    return { type: types.LOAD_STORE_SUCCESS, payload: store };
}

export function addStore(store: any): IAction {
    return {
        type: types.ADD_STORE,
        payload: store,
    };
}

export function updateStore(store: any): IAction {
    return {
        type: types.UPDATE_STORE,
        payload: store,
    };
}

export const loadStore = () => async (dispatch: Dispatch, getState: () => any): Promise<any> => {
    dispatch(loadingStore());

    const { auth } = getState();
    const { token } = auth;

    if (token) {
        try {
            const response = await storeApi.loadStore(token.accessToken);
            return dispatch(loadStoreSuccess(response));
        } catch (error) {
            return dispatch(loadStoreFaild());
        }
    }

    return dispatch(loadStoreFaild());
};

export function changePageActive(page: any) {
    return {
        type: types.CHANGE_PAGE,
        payload: page,
    };
}
