import { Card, Col, Divider, message, Row, Select, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import PageTopWrapper from '../../../components/page-top-wrapper';
import iconStore from '../../../assets/images/ic-dashboard-store.svg';
import iconUser from '../../../assets/images/ic-dashboard-user.svg';
import iconOrder from '../../../assets/images/ic-dashboard-order.svg';
import imgOrder from '../../../assets/images/img-dashboard-order.svg';
import imgUser from '../../../assets/images/img-dashboard-user.svg';
import imgStore from '../../../assets/images/img-dashboard-store.svg';
import './dashboard-home.less';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import DashboardApi from '../../../api/dashboard-api';
import moment from 'moment';

interface Props {}
interface IDashboardReport {
    data: Array<{ date: string; value: number }>;
    total: number;
}

const DashboardHome = (props: Props) => {
    const [order, setOrder] = useState<IDashboardReport>({ data: [], total: 0 });
    const [user, setUser] = useState<IDashboardReport>({ data: [], total: 0 });
    const [store, setStore] = useState<IDashboardReport>({ data: [], total: 0 });
    /**
     * filter by week or month
     * select the start of week/month and end of week/month to send to server
     * api has supported
     */
    const [filterType, setFilterType] = useState<'isoWeek' | 'month'>('isoWeek');
    const filterTypeOptions = [
        {
            value: 'isoWeek',
            label: 'Theo tuần',
        },
        {
            value: 'month',
            label: 'Theo tháng',
        },
    ];

    const options = (
        data: Array<{ date: string; value: number }>,
        name: string,
        color: string
    ): Highcharts.Options => ({
        title: { text: '' },
        subtitle: { text: '' },
        xAxis: {
            categories:
                filterType === 'isoWeek'
                    ? ['M', 'T', 'W', 'T', 'F', 'S', 'S']
                    : data.map((e) => e.date.split('/')[0]),
        },
        yAxis: { title: { text: '' } },
        series: [
            {
                name,
                type: 'column',
                data: data.map((e) => e.value),
            },
        ],
        chart: {
            height: 250,
        },
        colors: [color],
        plotOptions: {
            column: {
                borderRadius: 5,
                pointWidth: filterType === 'isoWeek' ? 20 : undefined,
            },
        },
    });

    useEffect(() => {
        const startTime: string = moment().startOf(filterType).valueOf().toString();
        const endTime: string = moment().endOf(filterType).valueOf().toString();

        const requestOrder = async () => {
            DashboardApi.loadReport({
                type: 'new-orders',
                startTime,
                endTime,
            })
                .then((resOrder) => setOrder(resOrder))
                .catch((e) => message.error(e.message || 'Something went wrong'));
            DashboardApi.loadReport({
                type: 'new-users',
                startTime,
                endTime,
            })
                .then((resUser) => setUser(resUser))
                .catch((e) => message.error(e.message || 'Something went wrong'));

            DashboardApi.loadReport({
                type: 'new-stores',
                startTime,
                endTime,
            })
                .then((resOrder) => setStore(resOrder))
                .catch((e) => message.error(e.message || 'Something went wrong'));
        };
        requestOrder();
    }, [filterType]);

    return (
        <>
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>TỔNG QUAN</Typography.Title>}
                rightContent={
                    <Select
                        placeholder='Theo tuần'
                        value={filterType}
                        onChange={(value) => setFilterType(value)}
                    >
                        {filterTypeOptions.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                }
            />
            <Row gutter={[30, 22]} style={{ padding: 20 }}>
                <Col span={12}>
                    <Row gutter={[20, 0]} style={{ height: '100%' }}>
                        <Col span={8}>
                            <div className='dashboard-card-summary yellow'>
                                <img src={imgOrder} alt='' />
                                <p className='title'>{order.total}</p>
                                <Divider />
                                <Typography.Text className='text'>
                                    Số lượng đơn
                                    <br /> đặt hàng
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='dashboard-card-summary blue'>
                                <img src={imgStore} alt='' />
                                <p className='title'>{store.total}</p>
                                <Divider />
                                <Typography.Text className='text'>
                                    Số lượng
                                    <br />
                                    cửa hàng
                                </Typography.Text>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='dashboard-card-summary'>
                                <img src={imgUser} alt='' />
                                <p className='title'>{user.total}</p>
                                <Divider />
                                <Typography.Text className='text'>
                                    Số lượng
                                    <br />
                                    người dùng
                                </Typography.Text>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Card
                        className='dashboard-card-chart'
                        title={
                            <Space>
                                <img src={iconStore} alt='' />
                                <Typography.Text>Số lượng cửa hàng mới trong tuần</Typography.Text>
                            </Space>
                        }
                    >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options(store.data, 'Số lượng cửa hàng mới', '#41a2ff')}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        className='dashboard-card-chart'
                        title={
                            <Space>
                                <img src={iconUser} alt='' />
                                <Typography.Text>
                                    Số lượng người dùng mới trong tuần
                                </Typography.Text>
                            </Space>
                        }
                    >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options(user.data, 'Số lượng người dùng mới', '#28c8d3')}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        className='dashboard-card-chart'
                        title={
                            <Space>
                                <img src={iconOrder} alt='' />
                                <Typography.Text>Số lượng đơn hàng mới trong tuần</Typography.Text>
                            </Space>
                        }
                    >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options(order.data, 'Số lượng đơn hàng mới', '#6c6fbf')}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default DashboardHome;
