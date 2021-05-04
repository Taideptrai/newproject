import { Button, Form, Input } from 'antd';
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BaseLayout } from '../../layout';
import FormHeader from '../auth-page/components/form-header/FormHeader';
import InnerAuth from '../auth-page/components/inner-auth/InnerAuth';

const title = 'Quên mật khẩu';
const subTitle = 'Sử dụng địa chỉ email của bạn';
const leftTitle = 'One of us?';
const leftDescription =
    'Lorem Ipsum is simply dummy text of the  printing and typesetting industry';
const loginTitle = 'Đăng nhập';

export interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = () => {
    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem('shortLiveToken');
    }, []);

    return (
        <BaseLayout title={title}>
            <InnerAuth
                authContent={
                    <div>
                        <p className="auth-content-title">{leftTitle}</p>
                        <p className="auth-content-des">{leftDescription}</p>
                        <Button
                            htmlType="submit"
                            block
                            className="auth-content-button"
                            onClick={() => {
                                history.push('/login');
                            }}
                        >
                            {loginTitle}
                        </Button>
                    </div>
                }
            >
                <div>
                    <FormHeader title={title} />

                    <Form onFinish={() => {}} layout="vertical" className="form">
                        <div className="form-content">
                            <p className="form-content-title">{subTitle}</p>

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập Email của bạn',
                                    },
                                    { type: 'email' },
                                ]}
                            >
                                <Input placeholder="Email" className="input-auth" />
                            </Form.Item>

                            <Button type="primary" htmlType="submit" className="form-button">
                                {title}
                            </Button>
                        </div>
                    </Form>
                </div>
            </InnerAuth>
        </BaseLayout>
    );
};
export default ForgotPassword;
