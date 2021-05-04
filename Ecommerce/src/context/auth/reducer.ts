import {IAction, IState} from './inteface';
import {types} from './types';

const initialState: IState = {
    loading: true,
    isAuth: false,
    user: undefined,
    isLogout: false,
};

const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: true,
            };

        case types.LOAD_USER_DONE:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                loading: false,
                isLogout: false,
            };

        case types.LOAD_USER_FAILED:
        case types.LOGOUT:
            return {
                ...initialState,
                isLogout: true,
                loading: false,
            };

        default:
            return state;
    }
};

export {initialState, reducer};
