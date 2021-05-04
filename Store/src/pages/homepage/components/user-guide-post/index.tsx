import { ArrowRightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
import React, { FC } from 'react';

interface IPost {
    id: string;
    title: string;
    date: number;
    description: string;
    link: string;
}

const posts: IPost[] = [
    {
        id: '1',
        title: 'Hướng dẫn tạo đơn hàng',
        date: Date.now(),
        description:
            'Hãy cùng Insa điểm qua những lợi ích mà quản lý website bán hàng mang lại cho doanh nghiệp. Sau dây là những hướng dẫn giúp bạn tạo đơn hàng nhanh chóng tiện lợi',
        link: '/',
    },
    {
        id: '2',
        title: 'Hướng dẫn kết nối đơn vị vận chuyển',
        date: Date.now(),
        description:
            'Hãy cùng Insa điểm qua những lợi ích mà quản lý website bán hàng mang lại cho doanh nghiệp. Sau dây là những hướng dẫn giúp bạn tạo đơn hàng nhanh chóng tiện lợi',
        link: '/',
    },
    {
        id: '3',
        title: 'Hướng dẫn tạo đơn nhập kho',
        date: Date.now(),
        description:
            'Hãy cùng Insa điểm qua những lợi ích mà quản lý website bán hàng mang lại cho doanh nghiệp. Sau dây là những hướng dẫn giúp bạn tạo đơn hàng nhanh chóng tiện lợi',
        link: '/',
    },
];

const Post: FC<{ post: IPost }> = ({ post }) => (
    <Row key={post.id} gutter={[20, 20]}>
        <Col>
            <Avatar shape="square" style={{ width: 230, height: 138 }} />
        </Col>
        <Col style={{ flex: 1 }}>
            <Space direction="vertical" size={3}>
                <Typography.Title level={5} style={{ margin: 0 }}>
                    {post.title}
                </Typography.Title>
                <div>
                    <Space>
                        <ClockCircleOutlined style={{ color: '#9e9e9e' }} />
                        <Typography.Text style={{ color: '#9e9e9e' }}>
                            {moment(post.date).format('DD/MM/YYYY')}
                        </Typography.Text>
                    </Space>
                </div>
                <div>
                    <Typography.Text style={{ color: '#787878' }}>
                        {post.description}
                    </Typography.Text>
                </div>

                <Button style={{ borderRadius: 30 }}>
                    Đọc tiếp <ArrowRightOutlined />
                </Button>
            </Space>
        </Col>
    </Row>
);

const UserGuidePost: FC = () => {
    return (
        <>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
};

export default UserGuidePost;
