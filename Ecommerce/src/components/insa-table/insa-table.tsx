import {Col, Pagination, Row, Select, Space, Table, Typography} from 'antd';
import {ColumnType, TablePaginationConfig, TableProps} from 'antd/lib/table';
import cls from 'classnames';
import {isNil} from 'lodash';
import React, {FC, ReactNode} from 'react';
import './insa-table.less';

const {Option} = Select;

const LIMIT_OPTIONS = [15, 30, 50, 100];

interface Props<T = any> extends TableProps<T> {
    name?: string;
    headerExtend?: ReactNode;
    hasDefaultColumn?: boolean;
    isShowTotal?: boolean;
}

interface PropsPageSize<T = any> extends Props<T> {
    onChangePageSize: any;
}

const defaultColumn: ColumnType<any> = {
    title: 'STT',
    dataIndex: 'id',
    render: (_: any, record: any, index: number) => index + 1,
    align: 'center',
};

const InsaTable: FC<Props> = ({
    name,
    pagination,
    className,
    headerExtend,
    columns,
    hasDefaultColumn,
    isShowTotal = false,
    ...props
}) => {
    const hasTitle = name || headerExtend;
    const renderHeader = () => {
        if (hasTitle) {
            return (
                <>
                    {name && (
                        <div className="insa-table__title title-card">
                            {name}
                        </div>
                    )}
                    {!isNil(headerExtend) && (
                        <Row className="table__header__extend">
                            {headerExtend}
                        </Row>
                    )}
                </>
            );
        }
    };

    const showTotal = () => {
        if (!isShowTotal) {
            return undefined;
        }

        const _pagination = pagination as TablePaginationConfig;

        if (
            _pagination &&
            _pagination.current &&
            _pagination.pageSize &&
            props.dataSource
        ) {
            return (
                <Typography.Paragraph
                    style={{
                        fontWeight: 400,
                        color: '#525253',
                    }}
                >
                    {`Hiển thị kết quả từ ${
                        (_pagination?.current - 1) * _pagination.pageSize + 1
                    } - ${
                        (_pagination?.current - 1) * _pagination.pageSize +
                        props.dataSource?.length
                    } trên tổng ${_pagination.total} mục`}
                </Typography.Paragraph>
            );
        }
    };

    const titleProps = hasTitle ? {title: renderHeader} : {};

    return (
        <Table
            className={cls('table insa-table', className, {
                showTotal: isShowTotal,
            })}
            rowClassName={(record, index) =>
                index % 2 === 0 ? 'table-row-dark' : 'table-row-light'
            }
            columns={
                hasDefaultColumn ? [defaultColumn, ...(columns as [])] : columns
            }
            pagination={pagination ? {...pagination, showTotal} : false}
            {...titleProps}
            {...props}
        />
    );
};

const InsaTablePageSize: FC<PropsPageSize> = ({
    name,
    pagination,
    className,
    columns,
    hasDefaultColumn,
    onChangePageSize,
    ...props
}) => {
    const _pagination = pagination as TablePaginationConfig;

    return (
        <>
            <Table
                className={cls('table insa-table', className)}
                rowClassName={(record, index) =>
                    index % 2 === 0 ? 'table-row-dark' : 'table-row-light'
                }
                columns={
                    hasDefaultColumn
                        ? [defaultColumn, ...(columns as [])]
                        : columns
                }
                pagination={false}
                {...props}
            />
            <Row
                justify="space-between"
                align="middle"
                style={{paddingTop: 12}}
                className="insa-table-page-size-paginate"
            >
                {_pagination?.pageSize && (
                    <Col>
                        <Space>
                            <span>Số lượng hiển thị:</span>
                            <Select
                                value={_pagination.pageSize}
                                onChange={onChangePageSize}
                                bordered={false}
                            >
                                {LIMIT_OPTIONS.map(item => (
                                    <Option value={item}>{item}</Option>
                                ))}
                            </Select>
                        </Space>
                    </Col>
                )}
                <Col>
                    <Pagination {..._pagination} />
                </Col>
            </Row>
        </>
    );
};

export {InsaTable, InsaTablePageSize};
