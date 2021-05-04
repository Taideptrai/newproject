import React, { FC } from 'react';
import { InsaButton } from '../../../../../components';
import { useBilling } from '../../state/context';

interface Props {}

const SubmitBilling: FC<Props> = () => {
    const { createPayment } = useBilling();
    return (
        <InsaButton
            type="primary"
            style={{ width: '100%', marginTop: 20, borderRadius: 8 }}
            onClick={createPayment}
        >
            THANH TOÁN
        </InsaButton>
    );
};

export default SubmitBilling;
