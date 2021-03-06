import { Button, Col, Form, Input, message, Row, Select, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { map, pick } from 'lodash';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import warehouseApi from '../../../../../api/warehouse-api';
import { disabledAutosuggestion } from '../../../../../helper';
import rules from '../../../../../helper/rules';
import {
    District,
    Province,
    useDistricts,
    useProvices,
    useWards,
    Ward,
} from '../../../../../hook/useLocation';
import { IState } from '../../../../../store/rootReducer';
import types from '../../../../../reducers/storeState/type';
import { IWarehouse } from '../../../../../models';

interface FormData {
    name: string;
    phoneNo: string;
    province: string;
    district: string;
    ward: string;
    address: string;
}

interface Props {
    toggle?: Function;
    warehouse?: IWarehouse;
}

const WarehouseForm: FC<Props> = ({ toggle, warehouse }) => {
    const store = useSelector((state: IState) => state.store.data);
    const warehouses = useSelector((state: IState) => state.store.warehouses);
    const dispatch = useDispatch();
    const [form] = useForm();

    const [loading, setLoading] = useState<boolean>(false);
    const [province, setProvince] = useState<string | undefined>(warehouse?.province);
    const [district, setDistrict] = useState<string | undefined>(warehouse?.district);

    const { loadingProvince, provinces } = useProvices();
    const { loadingDistrict, districts } = useDistricts(province);
    const { loadingWard, wards } = useWards({ province, district });

    const onChangeProvince = (value: string) => {
        setProvince(value);

        removeField('district');
    };

    const onChangeDistrict = (value: string) => {
        setDistrict(value);

        removeField('ward');
    };

    const removeField = (field: string) => {
        form.setFieldsValue({
            [field]: undefined,
        });
    };

    const resetForm = () => {
        form.resetFields();
    };

    const createWarehouse = async (values: FormData) => {
        try {
            const response = await warehouseApi.createWarehouse(store._id as string, values);
            message.success('Th??m chi nh??nh th??nh c??ng');
            if (toggle) {
                toggle();
            }

            const newWarehouses = [...warehouses, response];

            dispatch({
                type: types.SET_WAREHOUSES,
                payload: newWarehouses,
            });
        } catch (error) {
            message.error('L???i th??m chi nh??nh');
        } finally {
            setLoading(false);
        }
    };

    const editWarehouse = async (values: FormData) => {
        try {
            const response = await warehouseApi.editWarehouse(
                store._id as string,
                warehouse?._id as string,
                values
            );

            message.success('S???a chi nh??nh th??nh c??ng');
            if (toggle) {
                toggle();
            }

            const newWarehouses = warehouses.map((item) => {
                if (item._id === response._id) {
                    return response;
                }
                return item;
            });

            dispatch({
                type: types.SET_WAREHOUSES,
                payload: newWarehouses,
            });
        } catch (error) {
            message.error('L???i s???a chi nh??nh');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values: FormData) => {
        setLoading(true);
        if (warehouse) {
            editWarehouse(values);
        } else {
            createWarehouse(values);
        }
    };

    const initialValues = {
        ...pick(warehouse, ['name', 'phoneNo', 'province', 'district', 'ward', 'address']),
    };

    return (
        <Form onFinish={onFinish} layout="vertical" initialValues={initialValues} form={form}>
            <Form.Item
                name="name"
                label="T??n chi nh??nh"
                rules={[
                    {
                        required: true,
                        message: '??i???n t??n chi nh??nh',
                    },
                    {
                        max: 255,
                        message: 'T??n chi nh??nh qu?? d??i',
                    },
                ]}
            >
                <Input placeholder="??i???n t??n chi nh??nh" />
            </Form.Item>

            <Form.Item
                name="phoneNo"
                label="S??? ??i???n tho???i"
                rules={[
                    {
                        required: true,
                        message: '??i???n s??? ??i???n tho???i chi nh??nh',
                    },

                    {
                        validator: rules.validatePhone,
                    },
                ]}
            >
                <Input placeholder="??i???n s??? ??i???n tho???i chi nh??nh" />
            </Form.Item>

            <Row gutter={15}>
                <Col span={8}>
                    <Form.Item
                        name="province"
                        label="T???nh/th??nh ph???"
                        rules={[
                            {
                                required: true,
                                message: 'Ch???n t???nh/th??nh ph???',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={onChangeProvince}
                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            loading={loadingProvince}
                            onFocus={disabledAutosuggestion}
                            placeholder="Ch???n t???nh/th??nh ph???"
                        >
                            <Select.Option value={'-1'} key={'-1'} disabled>
                                Ch???n t???nh/th??nh ph???
                            </Select.Option>

                            {map(provinces, (province: Province) => (
                                <Select.Option value={province.code} key={province.code}>
                                    {province.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="district"
                        label="Qu???n/huy???n"
                        rules={[
                            {
                                required: true,
                                message: 'Ch???n qu???n/huy???n',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Ch???n qu???n/huy???n"
                            onChange={onChangeDistrict}
                            showSearch
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={!province}
                            loading={loadingDistrict}
                            onFocus={disabledAutosuggestion}
                        >
                            <Select.Option value={'-1'} key={'-1'} disabled>
                                Ch???n qu???n/huy???n
                            </Select.Option>
                            {map(districts, (district: District) => (
                                <Select.Option value={district.code} key={district.code}>
                                    {district.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="ward"
                        label="X??/ph?????ng"
                        rules={[
                            {
                                required: true,
                                message: 'Ch???n x??/ph?????ng',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Ch???n x??/ph?????ng"
                            showSearch
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={!district}
                            loading={loadingWard}
                            onFocus={disabledAutosuggestion}
                        >
                            <Select.Option value={'-1'} key={'-1'} disabled>
                                Ch???n x??/ph?????ng
                            </Select.Option>
                            {map(wards, (ward: Ward) => {
                                return (
                                    <Select.Option value={ward.code} key={ward.code}>
                                        {ward.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="address"
                label="?????a ch???"
                rules={[
                    {
                        required: true,
                        message: '??i???n ?????a ch??? chi nh??nh',
                    },
                ]}
            >
                <Input.TextArea rows={3} placeholder="??i???n ?????a ch??? chi nh??nh" />
            </Form.Item>

            <Form.Item>
                <Space style={{ float: 'right' }}>
                    <Button onClick={resetForm}>L??m l???i</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {warehouse ? 'C???p nh???t' : 'Th??m chi nh??nh'}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default WarehouseForm;
