import PageTopWrapper from '../../../components/page-top-wrapper';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Typography, Col, Input, Row } from 'antd';
import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseLayout } from '../../../layout';
import FanpageTable from '../components/fanpage-table';
import { loadFanpage, searchFanpage } from '../state/fanpageSlide';

interface Props {}

const { Search } = Input;

const Fanpage: FC<Props> = () => {
    const [text, setText] = useState('');
    const page = useSelector((state: any) => state.fanpage.page);
    const limit = useSelector((state: any) => state.fanpage.limit);
    const sort = useSelector((state: any) => state.fanpage.sort);
    const direction = useSelector((state: any) => state.fanpage.direction);
    const name = useSelector((state: any) => state.fanpage.name);
    const dispatch = useDispatch();

    const onSearch = (value: string) => {
        dispatch(searchFanpage(value));
    };

    const onChangeText = (e: any) => {
        setText(e.target.value);
    };

    const resetSearch = () => {
        dispatch(searchFanpage(null));
        setText('');
    };

    useEffect(() => {
        dispatch(loadFanpage());
    }, [page, limit, sort, direction, name]);

    return (
        <BaseLayout>
            <PageTopWrapper
                leftContent={
                    <Typography.Title style={{ margin: 0 }} level={3}>
                        FANPAGE
                    </Typography.Title>
                }
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

                <FanpageTable />
            </div>
        </BaseLayout>
    );
};

export default Fanpage;
