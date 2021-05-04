import {Button, Form, Input, message} from 'antd';
import {useForm} from 'antd/lib/form/Form';
import {Store} from 'antd/lib/form/interface';
import {get} from 'lodash';
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {loginWithEmail} from '../../../../api';
import {setToken} from '../../../../api/token';
import {Loading} from '../../../../components';
import AuthLayout from '../../../../components/auth-layout';
import {redirectAppPage, useProgress, useSearchState} from '../../../../hooks';
import FormHeader from '../../components/form-header/FormHeader';
import InnerAuth from '../../components/inner-auth/InnerAuth';
import {changeFormField} from '../../utils';
import {errorCommon} from '../forgot-password';
import './style.less';

const title = 'Đăng nhập';
const subTitle = 'Sử dụng tài khoản của bạn';
const forgotPasswordTitle = 'Bạn quên mật khẩu?';
const leftTitle = 'Xin chào!';
const leftDescription =
    'Bạn chưa có tài khoản? đăng ký ngay để trải nghiệm sản phẩm của chúng tôi';
const signUpTitle = 'Đăng ký';
const errorWrongEmailPassword =
    'Email hoặc mật khẩu không đúng, vui lòng kiểm tra lại';

function Login(): JSX.Element {
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const loading = useProgress();

    const history = useHistory();
    const [form] = useForm();
    const searchState = useSearchState();

    const handleSubmit = async (value: Store): Promise<void> => {
        try {
            setLoadingSubmit(true);
            const response = await loginWithEmail(value);

            if (!response.accessToken) {
                message.error(errorCommon);
                return;
            }

            setToken({token: response, remember: true});

            redirectAppPage(response, searchState);
        } catch (error) {
            const errorMessage =
                get(error, 'response.data.message') ===
                'EMAIL_OR_PASSWORD_INCORRECT'
                    ? errorWrongEmailPassword
                    : errorCommon;
            message.error(errorMessage);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const goToSignUp = () => {
        history.push(`/sign-up${history.location.search}`);
    };

    if (loading) {
        return <Loading full />;
    }

    return (
        <AuthLayout title={title}>
            <InnerAuth
                reverse
                authContent={
                    <div>
                        <p className="auth-content-title">{leftTitle}</p>
                        <p className="auth-content-des">{leftDescription}</p>

                        <Button
                            htmlType="submit"
                            block
                            className="auth-content-button"
                            onClick={goToSignUp}
                        >
                            {signUpTitle}
                        </Button>
                    </div>
                }
            >
                <div>
                    <FormHeader title={title} />
                    <Form
                        onFinish={handleSubmit}
                        layout="vertical"
                        className="form"
                        form={form}
                    >
                        <div className="form-content">
                            <p className="form-content-title">{subTitle}</p>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập địa chỉ email',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email không hợp lệ',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Email"
                                    className="input-auth"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        changeFormField(
                                            form,
                                            'email',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Form.Item>
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
                                    placeholder="Mật khẩu"
                                    className="input-auth"
                                />
                            </Form.Item>
                            <div className="login-form-button">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="form-button"
                                    loading={loadingSubmit}
                                >
                                    {title}
                                </Button>
                            </div>

                            <div>
                                <Link
                                    to={`/forgot-password${history.location.search}`}
                                    className="forgot-pass"
                                >
                                    {forgotPasswordTitle}
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </InnerAuth>
        </AuthLayout>
    );
}

export default Login;
