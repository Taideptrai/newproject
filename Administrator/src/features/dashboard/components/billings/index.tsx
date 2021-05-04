import { ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTopWrapper from '../../../../components/page-top-wrapper';
import { loadBillings, searchBilling, resetBlillings } from '../../state/billingSlide';
import BillingTable from '../billing-table';

interface Props {}

const { Search } = Input;

const Billing: FC<Props> = () => {
    const dispatch = useDispatch();

    const page = useSelector((state: any) => state.billing.page);
    const limit = useSelector((state: any) => state.billing.limit);
    const sort = useSelector((state: any) => state.billing.sort);
    const direction = useSelector((state: any) => state.billing.direction);
    const name = useSelector((state: any) => state.billing.name);
    const reset = useSelector((state: any) => state.billing.reset);

    const [text, setText] = useState('');

    const onSearch = (value: string) => {
        dispatch(searchBilling(value));
    };

    const onChangeText = (e: any) => {
        setText(e.target.value);
    };

    const resetSearch = () => {
        dispatch(resetBlillings(null));
        setText('');
    };
    useEffect(() => {
        dispatch(loadBillings());
    }, [page, limit, sort, direction, name, reset]);

    return (
        <>
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>BILLINGS</Typography.Title>}
                rightContent={<div />}
            />
            <div style={{ padding: 20 }}>
                <Row gutter={15} style={{ marginBottom: 15 }} align='middle'>
                    <Col>Tìm kiếm</Col>
                    <Col>
                        <Search
                            value={text}
                            onChange={onChangeText}
                            onSearch={onSearch}
                            placeholder='Tìm kiếm'
                        />
                    </Col>

                    <Col>
                        <Button icon={<ReloadOutlined />} onClick={resetSearch}></Button>
                    </Col>
                </Row>
                <BillingTable />
            </div>
        </>
    );
};

export default Billing;
