import React, {FC, lazy, Suspense} from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {Loading, NotFound} from '../../components';
import {DashboardLayout} from '../../layout';

const Overview = lazy(() => import('./pages/overview'));
const Analysis = lazy(() => import('./pages/analysis'));

interface Props {}

const Dashboard: FC<Props> = () => {
    const match = useRouteMatch();

    return (
        <DashboardLayout>
            <Suspense fallback={<Loading full />}>
                <Switch>
                    <Route
                        component={Overview}
                        path={`${match.path}/overview`}
                    />
                    <Route
                        component={Analysis}
                        path={`${match.path}/analysis`}
                    />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </DashboardLayout>
    );
};

export default Dashboard;
