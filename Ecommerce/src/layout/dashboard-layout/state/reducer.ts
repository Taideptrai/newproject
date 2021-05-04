import {IAction, IState} from './interface';
import {types} from './types';

const initialState = {
    isCollapsed: false,
};

const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case types.TOGGLE_COLLAPSED:
            return {
                ...state,
                isCollapsed: action.payload,
            };
        default:
            return state;
    }
};

export {initialState, reducer};
