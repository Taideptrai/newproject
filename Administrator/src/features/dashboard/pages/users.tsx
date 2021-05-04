import { ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTopWrapper from '../../../components/page-top-wrapper';
import { BaseLayout } from '../../../layout';
import UserTable from '../components/user-table';
import { loadUsers, searchUser } from '../state/userSlide';

interface Props {}

const { Search } = Input;

const Users: FC<Props> = () => {
    const [text, setText] = useState('');
    const page = useSelector((state: any) => state.user.page);
    const limit = useSelector((state: any) => state.user.limit);
    const sort = useSelector((state: any) => state.user.sort);
    const direction = useSelector((state: any) => state.user.direction);
    const search = useSelector((state: any) => state.user.search);
    const dispatch = useDispatch();

    const onSearch = (value: string) => {
        dispatch(searchUser(value));
    };

    const onChangeText = (e: any) => {
        setText(e.target.value);
    };

    const resetSearch = () => {
        dispatch(searchUser(null));
        setText('');
    };

    useEffect(() => {
        dispatch(loadUsers());
    }, [page, limit, sort, direction, search]);

    return (
        <BaseLayout>
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>NGƯỜI DÙNG</Typography.Title>}
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

                <UserTable />
            </div>
        </BaseLayout>
    );
};

export default Users;
