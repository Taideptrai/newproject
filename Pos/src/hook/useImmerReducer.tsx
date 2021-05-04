import produce from 'immer';
import { useReducer } from 'react';

function useImmerReducer(reducer: any, initialState: any) {
    return useReducer(produce(reducer), initialState);
}

export default useImmerReducer;
