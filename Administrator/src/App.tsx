import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './state/store';

function App() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
}

export default App;
