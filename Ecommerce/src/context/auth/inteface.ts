import {IUser} from '../../collections';

export interface IState {
    loading: boolean;
    isAuth: boolean;
    isLogout: boolean;
    user?: IUser;
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
    loadUser: any;
}
