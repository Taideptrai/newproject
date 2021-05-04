import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import authApi from '../../api/auth-api';
import { loginActionWithEmail } from '../../reducers/authState/authAction';

const size = 'large';

interface FormData {
    email?: string;
    password?: string;
}

function SignupForm() {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const toggleError = () => setError(!error);

    const onFinish = async (values: FormData): Promise<void> => {
        setLoading(true);

        authApi
            .signupWithEmail(values)
            .then(async () => {
                const data = {
                    email: values.email,
                    password: values.password,
                };
                const response: any = await authApi.loginWithEmail(data);
                dispatch(loginActionWithEmail(response));
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
            });
    };

    return (
        <>
            {error && (
                <Alert
                    message='Lỗi đăng ký'
                    description='Tài khoản đã tồn tại, vui lòng kiểm tra lại địa chỉ email'
                    type='error'
                    showIcon
                    closable
                    afterClose={toggleError}
                    style={{ margin: '15px 0' }}
                />
            )}

            <Form onFinish={onFinish}>
                <Form.Item name='name' required rules={[{ required: true, message: 'Nhập tên' }]}>
                    <Input placeholder='Tên' size={size} />
                </Form.Item>
                <Form.Item
                    name='email'
                    required
                    rules={[{ required: true, message: 'Nhập địa chỉ email' }]}
                >
                    <Input placeholder='Email' size={size} />
                </Form.Item>
                {/* <Form.Item
                    name="phoneNo"
                    rules={[{ required: true, message: 'Số điện thoại' }]}
                >
                    <Input placeholder="Số điện thoại" size={size} />
                </Form.Item> */}
                <Form.Item name='password' rules={[{ required: true, message: 'Nhập mật khẩu' }]}>
                    <Input.Password placeholder='Mật khẩu' size={size} />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' block size={size} loading={loading}>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default SignupForm;
