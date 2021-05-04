import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, message, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { resetBlillings } from '../../state/billingSlide';
import storeApi from '../../../../api/store-api';

interface Props {
    billingId: string;
}

const Actions = ({ billingId }: Props) => {
    const dispatch = useDispatch();

    const handleApproveBilling = async () => {
        try {
            await storeApi.approveBilling({ billingId });
            dispatch(resetBlillings(null));
        } catch (e) {
            message.error('Đã có lỗi xảy ra, vui lòng thử lại!');
        }
    }

    return (
        <Popconfirm
            title="Bạn có chắc chắn duyệt đơn hàng này?"
            placement="topRight"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            okText="Duyệt"
            cancelText="Hủy"
            onConfirm={handleApproveBilling}
        >
            <Button type='primary'>
                Duyệt
            </Button>
        </Popconfirm>
    );
};

Actions.propTypes = {};

export default Actions;
