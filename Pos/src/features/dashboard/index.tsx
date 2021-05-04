import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { getAuthParam } from '../../api/token';
import { ESaleChannel } from '../../collections/sale-channel';
import { Header, Loading, NotFound } from '../../components';
import constants from '../../constants';
import { BaseLayout } from '../../layout';
import './assets/style.less';
import NoChannel from './components/no-channel';
import { loadCategories, loadStore } from './state/store-slide';

const SalesCounters = lazy(() => import('./pages/sales-counters'));
const OrderPage = lazy(() => import('./pages/order'));
const Products = lazy(() => import('./pages/products'));

const title = 'Dashboard';

function Dashboard() {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.store.loading);
    const store = useSelector((state: any) => state.store.store);

    useEffect(() => {
        dispatch(loadStore());

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (store) {
            dispatch(loadCategories());
        }
    }, [store]);

    if (loading) return <Loading full />;

    if (!store?._id) {
        window.location.href = `${constants.URL_STORE}save-token?${getAuthParam()}`;
        return null;
    }

    if (!(store.saleChannels || []).includes(ESaleChannel.POS)) {
        return <NoChannel />;
    }

    return (
        <BaseLayout title={title}>
            <div className='dashboard'>
                <Header />
                <div className='content'>
                    <Suspense fallback={<Loading full />}>
                        <Switch>
                            <Redirect exact from={match.path} to={`${match.path}/sales-counters`} />
                            <Route
                                component={SalesCounters}
                                path={`${match.path}/sales-counters`}
                            />
                            <Route component={OrderPage} path={`${match.path}/orders`} />
                            <Route component={Products} path={`${match.path}/products`} />
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Dashboard;
