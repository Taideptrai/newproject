import React, { FC } from 'react';
import { BaseLayout } from '../../../../layout';
import ProviderContext from './state/context';
import Sales from './sales-counters';

const title = 'Bán hàng tại quầy';

const SalesCounters: FC = () => {
    return (
        <ProviderContext>
            <BaseLayout title={title}>
                <Sales />
            </BaseLayout>
        </ProviderContext>
    );
};

export default SalesCounters;
