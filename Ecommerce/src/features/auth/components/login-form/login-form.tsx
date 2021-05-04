import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {Button, Form, Input, message} from 'antd';
import {Store} from 'antd/lib/form/interface';
import React, {FC, useState} from 'react';
import {loginWithEmail, setToken} from '../../../../api';
import {useAuth} from '../../../../context';

const size = 'large';

const LoginForm: FC = () => {
    const {loadUser} = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (value: Store): Promise<void> => {
        try {
            setLoading(true);

            const response = await loginWithEmail(value);

            console.log('response', response);
            await setToken({token: response});
            loadUser();
        } catch (error) {
            console.log(error);
            message.error('Xảy ra lỗi, vui lòng kiểm tra lại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        type: 'email',
                        message: 'Địa chỉ email không đúng',
                    },
                    {
                        required: true,
                        message: 'Điền địa chỉ email',
                    },
                ]}
            >
                <Input
                    type="email"
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    size={size}
                />
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu"
                    size={size}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size={size}
                    block
                >
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );
};

export {LoginForm};
