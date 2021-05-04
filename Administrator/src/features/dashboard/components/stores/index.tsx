import { ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTopWrapper from '../../../../components/page-top-wrapper';
import { loadStores, searchStore } from '../../state/storeSlide';
import StoreTable from '../store-table';

interface Props {}

const { Search } = Input;

const Stores: FC<Props> = () => {
    const dispatch = useDispatch();

    const page = useSelector((state: any) => state.store.page);
    const limit = useSelector((state: any) => state.store.limit);
    const sort = useSelector((state: any) => state.store.sort);
    const direction = useSelector((state: any) => state.store.direction);
    const name = useSelector((state: any) => state.store.name);

    const [text, setText] = useState('');

    const onSearch = (value: string) => {
        dispatch(searchStore(value));
    };

    const onChangeText = (e: any) => {
        setText(e.target.value);
    };

    const resetSearch = () => {
        dispatch(searchStore(null));
        setText('');
    };
    useEffect(() => {
        dispatch(loadStores());
    }, [page, limit, sort, direction, name]);

    return (
        <>
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>CỬA HÀNG</Typography.Title>}
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
                <StoreTable />
            </div>
        </>
    );
};

export default Stores;
