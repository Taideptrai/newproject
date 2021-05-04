import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './root-reducer';

const store = configureStore({
    reducer: rootReducers,
});

export default store;
