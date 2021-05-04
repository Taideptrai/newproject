import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useMemo,
    useReducer,
} from 'react';
import {IContext} from './interface';
import {initialState, reducer} from './reducer';
import {types} from './types';

const initialContext = {
    state: initialState,
    dispatch: (): void => {},
};

const Context = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
}

const ProviderLayoutDashboard: FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => ({state, dispatch}), [state, dispatch]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useLayoutDashboard = (): any => {
    const {state, dispatch} = useContext(Context);

    const toggleSidebar = (isCollapsed: boolean): void => {
        dispatch({
            type: types.TOGGLE_COLLAPSED,
            payload: isCollapsed,
        });
    };

    return {
        ...state,
        toggleSidebar,
    };
};
export {ProviderLayoutDashboard, useLayoutDashboard};
