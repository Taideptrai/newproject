import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BaseLayout } from '../../../layout';
import DetailStore from './detailStore';
import Store from '../components/stores';

const Stores = () => {
    return (
        <BaseLayout title='Shops'>
            <Switch>
                <Route component={Store} path={`/dashboard/shops`} exact />
                <Route component={DetailStore} path={`/dashboard/shops/:id`} exact />
            </Switch>
        </BaseLayout>
    );
};

export default Stores;
