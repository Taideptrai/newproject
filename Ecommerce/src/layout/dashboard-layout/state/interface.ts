export interface IState {
    isCollapsed: boolean;
}

export interface IAction {
    type: string;
    payload?: any;
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<any>;
}
