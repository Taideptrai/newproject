import React, {FC} from 'react';
import {ProviderAuth} from './context';
import {Routes} from './routes';

const App: FC = () => {
    return (
        <ProviderAuth>
            <Routes />
        </ProviderAuth>
    );
};

export default App;
