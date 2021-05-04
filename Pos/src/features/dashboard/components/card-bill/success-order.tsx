import { PlusCircleOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space } from 'antd';

import { IOrder } from '../../../../collections/order';
import React, { FC } from 'react';
import storeImg from '../../assets/images/store-blue.svg';
import { useSalesCounter } from '../../pages/sales-counters/state/context';

interface Props {
    toggle: () => void;
    order?: IOrder;
}

const SuccessOrder: FC<Props> = ({ toggle, order }) => {
    const { resetOrder } = useSalesCounter();

    const handleNewOrder = async () => {
        await toggle();

        setTimeout(() => {
            resetOrder();
        }, 300);
    };

    const handlePrintBill = () => {
        toggle();

        setTimeout(() => {
            resetOrder();
        }, 300);
    };

    return (
        <Row align='middle' justify='center' className='success-order'>
            <Col style={{ paddingTop: 30, paddingBottom: 30 }}>
                <Space style={{ width: '100%' }} size={15} direction='vertical'>
                    <img src={storeImg} alt='' />
                    <div className='title'>Thanh toán thành công</div>
                    <span>Mã đơn hàng: {order && order.code}</span>
                    <Space size={15}>
                        <Button icon={<PlusCircleOutlined />} onClick={handleNewOrder}>
                            Đơn hàng mới
                        </Button>
                        <Button type='primary' icon={<PrinterOutlined />} onClick={handlePrintBill}>
                            In hóa đơn
                        </Button>
                    </Space>
                </Space>
            </Col>
        </Row>
    );
};

export default SuccessOrder;
