import { PrinterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react';

interface Props {}

const OrderPrint: FC<Props> = () => {
    return (
        <Button type='primary' icon={<PrinterOutlined />}>
            In hóa đơn
        </Button>
    );
};

export default OrderPrint;
