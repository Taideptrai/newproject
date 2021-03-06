import { Button, Col, Form, Input, message, Row, Select, Space } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { map, omit } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import locationApi from '../../../api/location-api';
import storeApi from '../../../api/store-api';
import { IAuthState } from '../../../reducers/authState/authReducer';
import { IConversation, IFacebookState } from '../../../reducers/fanpageState/fanpageReducer';
import { IStoreState } from '../../../reducers/storeState/storeReducer';
import { District, Province } from '../../create-store/create-store-form';
import { useOrder } from './context-order';
import { validatePhone } from '../../../utils/validate-phone';
import { disabledAutosuggestion } from '../../../utils/disabled-autosuggestion';

interface Props {
    dataCustomer: any;
    isEditForm: boolean;
    toggleSetIsEditForm: () => void;
    changeDataCustomer: (value: any) => void;
}

const styleField = {
    marginBottom: 10,
};

const EditAddressCustomer: FC<Props> = ({
    dataCustomer,
    toggleSetIsEditForm,
    changeDataCustomer,
}: Props) => {
    const token: any = useSelector(({ auth }: { auth: IAuthState }) => auth.token);
    const store = useSelector(({ store }: { store: IStoreState }) => store.store);
    const conversation: IConversation = useSelector(
        ({ fanpage }: { fanpage: IFacebookState }) => fanpage.conversation
    );

    const { setInfoCustomer } = useOrder();

    const [form] = Form.useForm();
    const [edit, seEdit] = useState(false);

    const [loading, setLoading] = useState(false);

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [loadingProvince, setLoadingProvince] = useState<boolean>(true);
    const [province, setProvince] = useState<string | null>(dataCustomer.province);

    const [districts, setDistricts] = useState<District[]>([]);
    const [loadingDistrict, setLoadingDistrict] = useState<boolean>(false);
    const [district, setDistrict] = useState<string | null>(dataCustomer.district);

    const [wards, setWards] = useState<District[]>([]);
    const [loadingWard, setLoadingWard] = useState<boolean>(false);
    const [ward, setWard] = useState<string | null>(null);

    const onChangeProvince = (value: string) => {
        setProvince(value);
    };

    const onChangeDistrict = (value: string) => {
        setDistrict(value);
    };

    const onChangeWard = (value: string) => {
        setWard(value);
    };

    const toggleEdit = () => {
        seEdit(!edit);
        toggleSetIsEditForm();
    };

    const onFinish = async (values: Store) => {
        try {
            const data = {
                ...omit(dataCustomer, ['_id']),
                ...values,
                fbPageId: store.activePage._id,
                fbUserId: conversation.fbUserId,
            };

            let res;

            if (!dataCustomer._id || dataCustomer._id.length === 0) {
                res = await storeApi.createCustomer({
                    token: token.accessToken,
                    storeId: store._id,
                    data: omit(data, ['note']),
                });

                message.success('???? t???o th??nh c??ng kh??ch h??ng');
            } else {
                res = await storeApi.updateCustomer({
                    token: token.accessToken,
                    storeId: store._id,
                    customerId: dataCustomer._id,
                    data,
                });

                message.success('C???p nh???t th??nh c??ng kh??ch h??ng');
            }

            setInfoCustomer({
                ...res,
            });

            setLoading(false);
            changeDataCustomer({
                _id: res._id,
                fbUserId: res.fbUserId,
                name: res.name,
                phoneNo: res.phoneNo,
                address: res.address,
                province: res.province,
                district: res.district,
                ward: res.ward,
                note: res.note,
            });
            toggleEdit();
        } catch (error) {
            setLoading(false);
            message.error('???? c?? l???i x???y ra!');
        }
    };

    useEffect(() => {
        async function getListProvinces() {
            try {
                const response = await locationApi.getProvinces();

                setProvinces(response);
                setLoadingProvince(false);
            } catch (error) {
                setProvinces([]);
                setLoadingProvince(false);
            }
        }
        getListProvinces();
    }, []);

    useEffect(() => {
        async function getListDistricts() {
            if (!province) return null;
            setLoadingDistrict(true);
            form.setFieldsValue({
                district: undefined,
                ward: undefined,
            });
            try {
                const response = await locationApi.getDistricts(province);
                setDistricts(response);
                setLoadingDistrict(false);
            } catch (error) {
                setDistricts([]);
                setLoadingDistrict(false);
            }
        }
        getListDistricts();
    }, [province]);

    useEffect(() => {
        async function getListWard() {
            if (!district) return null;
            setLoadingWard(true);
            form.setFieldsValue({
                ward: undefined,
            });
            try {
                const response = await locationApi.getWards({
                    provinceId: province,
                    districtId: district,
                });

                setWards(response);
                setLoadingWard(false);
            } catch (error) {
                setWards([]);
                setLoadingWard(false);
            }
        }
        getListWard();
    }, [district]);

    const renderContent = () => {
        if (!edit) {
            const addressCustomer = `${dataCustomer.address}  ${
                (wards && wards[dataCustomer.ward] && wards[dataCustomer.ward].path_with_type) || ''
            }`;

            if (dataCustomer.phoneNo.trim().length === 0 && addressCustomer.trim().length === 0) {
                return <div>Ch??a c?? ?????a ch??? giao h??ng</div>;
            }

            return (
                <div>
                    {dataCustomer.phoneNo}
                    <br />
                    {addressCustomer}
                </div>
            );
        }

        return (
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name='name'
                    rules={[{ required: true, message: 'T??n kh??ch h??ng kh??ng ????? tr???ng' }]}
                    style={styleField}
                    initialValue={dataCustomer.name}
                >
                    <Input placeholder='Nh???p t??n kh??ch h??ng' />
                </Form.Item>
                <Form.Item
                    name='phoneNo'
                    rules={[
                        { required: true, message: 'S??? ??i???n tho???i kh??ng ????? tr???ng' },
                        {
                            validator: validatePhone,
                        },
                    ]}
                    style={styleField}
                    initialValue={dataCustomer.phoneNo}
                >
                    <Input placeholder='Nh???p s??? ??i???n tho???i' />
                </Form.Item>

                <Form.Item
                    name='province'
                    initialValue={dataCustomer.province}
                    rules={[{ required: true, message: 'Ch???n t???nh/ th??nh ph???' }]}
                    style={styleField}
                >
                    <Select
                        placeholder='T???nh/th??nh ph???'
                        onChange={onChangeProvince}
                        showSearch
                        value={dataCustomer.province}
                        filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // disabled={!!customerId && !isEditForm}
                        loading={loadingProvince}
                        onFocus={disabledAutosuggestion}
                    >
                        {map(provinces, (province: Province) => (
                            <Select.Option value={province.code} key={province.code}>
                                {province.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name='district'
                    initialValue={dataCustomer.district}
                    rules={[{ required: true, message: 'Ch???n qu???n/ huy???n' }]}
                    style={styleField}
                >
                    <Select
                        placeholder='Qu???n/huy???n'
                        onChange={onChangeDistrict}
                        showSearch
                        filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={dataCustomer.district}
                        // disabled={!dataCustomer.province || (!!customerId && !isEditForm)}
                        loading={loadingDistrict}
                        onFocus={disabledAutosuggestion}
                    >
                        {map(districts, (district: District) => (
                            <Select.Option value={district.code} key={district.code}>
                                {district.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name='ward'
                    initialValue={dataCustomer.ward}
                    rules={[{ required: true, message: 'Ch???n x??/ ph?????ng' }]}
                    style={styleField}
                >
                    <Select
                        placeholder='X??/ph?????ng'
                        onChange={onChangeWard}
                        showSearch
                        filterOption={(input, option: any) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        value={dataCustomer.ward}
                        // disabled={!dataCustomer.district || (!!customerId && !isEditForm)}
                        loading={loadingWard}
                        onFocus={disabledAutosuggestion}
                    >
                        {map(wards, (district: District) => (
                            <Select.Option value={district.code} key={district.code}>
                                {district.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name='address'
                    rules={[{ required: true, message: '?????a ch??? kh??ng ????? tr???ng' }]}
                    style={styleField}
                    initialValue={dataCustomer.address}
                >
                    <Input.TextArea rows={3} placeholder='Nh???p ?????a ch???' />
                </Form.Item>

                <Form.Item style={{ margin: 0, textAlign: 'right' }}>
                    <Space>
                        <Button onClick={toggleEdit}>H???y</Button>
                        <Button type='primary' htmlType='submit' loading={loading}>
                            L??u
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        );
    };

    return (
        <div>
            {!edit && (
                <Row justify='space-between' align='middle'>
                    <Col>
                        <span className='customer-address-title'>?????a ch??? giao h??ng</span>
                    </Col>

                    <Col>
                        <a onClick={toggleEdit}>Thay ?????i</a>
                    </Col>
                </Row>
            )}
            <div style={{ marginTop: 5 }}>{renderContent()}</div>
        </div>
    );
};

export default EditAddressCustomer;
