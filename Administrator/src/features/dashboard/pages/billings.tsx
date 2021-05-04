import React from 'react';
import { BaseLayout } from '../../../layout';
import Billing from '../components/billings';

const Billings = () => {
    return (
        <BaseLayout title='Billings'>
            <Billing />
        </BaseLayout>
    );
};

export default Billings;
