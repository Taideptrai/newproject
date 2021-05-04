import { pick } from 'lodash';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useState, FC, ReactNode } from 'react';
import { Form, Button, Input, Row, Col, Checkbox, Avatar, Alert, message } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authApi from '../../../api/auth-api';
import { loadUser } from '../state/auth-slide';
import { setToken } from '../../../api/token';

const { Password } = Input;

interface PrefixProps {
    children: ReactNode;
}

const size = 24;

const Prefix: FC<PrefixProps> = ({ children }) => {
    return <Avatar size={size} className='prefix-cirle' icon={children} />;
};

const FormLogin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const onSubmit = async (values: Store) => {
        try {
            setLoading(true);

            const data = pick(values, ['email', 'password']);
            const token = await authApi.loginWithEmail({
                ...data,
            });

            setToken({ token, remember: values.remember });

            dispatch(loadUser());
            message.success('Đăng nhập thành công');
            setLoading(false);
        } catch (error) {
            setError('Đăng nhập không thành công, vui lòng kiểm tra lại');

            setLoading(false);
        }
    };

    const removeError = () => setError('');

    return (
        <Form initialValues={{ remember: true }} onFinish={onSubmit} layout='vertical'>
            {error.length > 0 && (
                <Form.Item>
                    <Alert message={error} type='error' closable onClose={removeError}></Alert>
                </Form.Item>
            )}
            <Form.Item
                rules={[{ required: true, message: 'Không để trống địa chỉ email' }]}
                label={<span className='label-login'>Địa chỉ email</span>}
                name='email'
            >
                <Input
                    prefix={
                        <Prefix>
                            <UserOutlined />
                        </Prefix>
                    }
                />
            </Form.Item>

            <Form.Item
                rules={[{ required: true, message: 'Điền mật khẩu' }]}
                name='password'
                label={<span className='label-login'>Mật khẩu</span>}
            >
                <Password
                    prefix={
                        <Prefix>
                            <LockOutlined />
                        </Prefix>
                    }
                />
            </Form.Item>
            <Row align='middle' style={{ marginBottom: 20 }} justify='space-between'>
                <Col>
                    <Form.Item name='remember' valuePropName='checked' style={{ marginBottom: 0 }}>
                        <Checkbox>Lưu tài khoản</Checkbox>
                    </Form.Item>
                </Col>

                <Col>
                    <Link to='/auth/forgot-password'>Quên mật khẩu</Link>
                </Col>
            </Row>

            <Form.Item>
                <Button size='large' loading={loading} block type='primary' htmlType='submit'>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormLogin;
