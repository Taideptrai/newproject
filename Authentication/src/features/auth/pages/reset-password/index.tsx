import {Button, Form, Input, message} from 'antd';
import {Store} from 'antd/lib/form/interface';
import React, {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import * as queryString from 'query-string';
import {get} from 'lodash';

import {resetPassword} from '../../../../api';
import {STORE_URL} from '../../../../configs/vars';
import AuthLayout from '../../../../components/auth-layout';
import FormHeader from '../../components/form-header/FormHeader';
import InnerAuth from '../../components/inner-auth/InnerAuth';
import {errorCommon} from '../forgot-password';

const title = 'Đặt lại mật khẩu';
const subTitle = '';
const subTitleSuccess = 'Mật khẩu của bạn đã được thay đổi thành công';
const leftTitle = 'One of us?';
const leftDescription =
    'Lorem Ipsum is simply dummy text of the  printing and typesetting industry';
const loginTitle = 'Đăng nhập';
const errorExpireToken = 'Token của bạn đã hết hạn, vui lòng kiểm tra lại';

export interface ResetPasswordProps {}

const ResetPassword: FC<ResetPasswordProps> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const history = useHistory();

    const searchState: {
        token?: string;
    } = queryString.parse(history.location.search);

    const onClickLogin = () => {
        const search = queryString.stringify({
            url: `${STORE_URL}save-token`,
            location: JSON.stringify({
                pathname: '/',
            }),
            isLogout: true,
        });
        history.push(`/login?${search}`);
    };

    useEffect(() => {
        if (!searchState.token) {
            history.push('/404');
        }
    }, []);

    const handleSubmit = async (value: Store): Promise<void> => {
        try {
            setLoading(true);
            const response = await resetPassword({
                password: value.password,
                token: searchState.token,
            });
            if (response?.status !== 200) {
                message.error(errorCommon);
                return;
            }
            setSuccess(true);
        } catch (error) {
            const errorMessage =
                get(error, 'response.data.message') === 'TOKEN_EXPIRED'
                    ? errorExpireToken
                    : errorCommon;
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title={title}>
            <InnerAuth
                authContent={
                    <div>
                        <p className="auth-content-title">{leftTitle}</p>
                        <p className="auth-content-des">{leftDescription}</p>
                        <Button
                            htmlType="submit"
                            block
                            className="auth-content-button"
                            onClick={onClickLogin}
                        >
                            {loginTitle}
                        </Button>
                    </div>
                }
            >
                <div>
                    <FormHeader title={title} showSocialLogin={false} />

                    <Form
                        onFinish={handleSubmit}
                        layout="vertical"
                        className="form"
                    >
                        <div className="form-content">
                            {success ? (
                                <>
                                    <p className="form-content-title">
                                        {subTitleSuccess}
                                    </p>
                                    <Button
                                        block
                                        className="auth-content-button"
                                        type="primary"
                                        onClick={onClickLogin}
                                    >
                                        {loginTitle}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <p className="form-content-title">
                                        {subTitle}
                                    </p>

                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập mật khẩu',
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            type="password"
                                            placeholder="Mật khẩu mới"
                                            className="input-auth"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirm"
                                        dependencies={['password']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập mật khẩu',
                                            },
                                            ({getFieldValue}) => ({
                                                validator(_, value) {
                                                    if (
                                                        !value ||
                                                        getFieldValue(
                                                            'password',
                                                        ) === value
                                                    ) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error(
                                                            'Hai mật khẩu bạn đã nhập không giống nhau!',
                                                        ),
                                                    );
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password
                                            type="password"
                                            placeholder="Xác nhận mật khẩu mới"
                                            className="input-auth"
                                        />
                                    </Form.Item>

                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="form-button"
                                        loading={loading}
                                    >
                                        {title}
                                    </Button>
                                </>
                            )}
                        </div>
                    </Form>
                </div>
            </InnerAuth>
        </AuthLayout>
    );
};
export default ResetPassword;
