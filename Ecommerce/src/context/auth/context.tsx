import React, {
    createContext,
    FC,
    ReactNode,
    useReducer,
    useMemo,
    useContext,
    useEffect,
    useCallback,
} from 'react';
import {getToken, getUser, removeToken} from '../../api';
import {IUser} from '../../collections';

import {IContext} from './inteface';
import {initialState, reducer} from './reducer';
import {types} from './types';

const initialContext = {
    state: initialState,
    dispatch: () => {},
    loadUser: () => {},
};

const AuthContext = createContext<IContext>(initialContext);

interface Props {
    children: ReactNode;
}
interface IUseAuth {
    loadUser: () => void;
    logout: () => void;
    loading: boolean;
    isAuth: boolean;
    isLogout: boolean;
    user?: IUser;
}

const ProviderAuth: FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const loadUser = useCallback(async () => {
        dispatch({
            type: types.LOADING,
        });
        try {
            const response = await getUser();
            dispatch({type: types.LOAD_USER_DONE, payload: response});
        } catch (error) {
            dispatch({type: types.LOAD_USER_FAILED});
        }
    }, []);

    useEffect(() => {
        const token = getToken();
        if (token) {
            loadUser();
        }

        return () => {};
    }, []);

    const value = useMemo(() => ({state, dispatch, loadUser}), [
        state,
        dispatch,
        loadUser,
    ]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuth = (): IUseAuth => {
    const {state, loadUser, dispatch} = useContext(AuthContext);

    const logout = () => {
        removeToken();

        dispatch({
            type: types.LOGOUT,
        });
    };

    return {
        ...state,
        loadUser,
        logout,
    };
};

export {ProviderAuth, useAuth};
