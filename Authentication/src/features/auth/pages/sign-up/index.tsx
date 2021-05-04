import {Button, Form, Input, message} from 'antd';
import {useForm} from 'antd/lib/form/Form';
import {pick, get} from 'lodash';
import * as queryString from 'query-string';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {loginWithEmail, signupWithEmail} from '../../../../api';
import {IToken, removeToken, setToken} from '../../../../api/token';
import AuthLayout from '../../../../components/auth-layout';
import {STORE_URL} from '../../../../configs/vars';
import FormHeader from '../../components/form-header/FormHeader';
import InnerAuth from '../../components/inner-auth/InnerAuth';
import {changeFormField} from '../../utils';

const title = 'Đăng ký';
const subTitle = 'Sử dụng email của bạn để đăng ký';
const leftTitle = 'One of us?';
const leftDescription =
    'Lorem Ipsum is simply dummy text of the  printing and typesetting industry';
const loginTitle = 'Đăng nhập';

interface FormData {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

const getMessageError = (error: Error): string => {
    const messageText = get(error, 'response.data.status');
    if (messageText === 409) {
        return 'Tài khoản đã tồn tại';
    }

    return 'Đăng ký không thành công.';
};

function SignUp(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const [form] = useForm();

    const searchState: {
        url?: string;
        location?: string;
        isLogout?: string;
        saleChannel?: string;
        isHasStore?: boolean;
    } = queryString.parse(history.location.search);

    const redirectAppPage = (token: IToken) => {
        let objectSearch: any = {
            token: JSON.stringify(token),
            remember: true,
            location: '/',
            isHasStore: false,
        };

        if (searchState.saleChannel) {
            objectSearch = {
                ...objectSearch,
                saleChannel: searchState.saleChannel,
            };
        }

        const search = queryString.stringify(objectSearch);

        window.location.href = `${STORE_URL}save-token?${search}`;
    };

    useEffect(() => {
        if (!searchState.url || !searchState.location) {
            history.push('/sign-up');
        } else {
            localStorage.removeItem('shortLiveToken');
            removeToken();
        }
    }, []);

    const onFinish = async (values: FormData): Promise<void> => {
        setLoading(true);

        const data = pick(values, 'name', 'email', 'password');

        signupWithEmail(data)
            .then(async () => {
                const response: any = await loginWithEmail({
                    ...pick(data, ['email', 'password']),
                });
                if (!response.accessToken) {
                    message.error('Xảy ra lỗi, vui lòng kiểm tra lại');
                    return;
                }
                setToken({token: response, remember: true});
                redirectAppPage(response);
            })
            .catch(error => {
                const messageError = getMessageError(error);

                message.error(messageError);
            })
            .finally(() => {
                setLoading(false);
            });
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
                            onClick={() => {
                                history.push(
                                    `/login${history.location.search}`,
                                );
                            }}
                        >
                            {loginTitle}
                        </Button>
                    </div>
                }
            >
                <div>
                    <FormHeader title={title} />

                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        className="form"
                        form={form}
                    >
                        <div className="form-content">
                            <p className="form-content-title">{subTitle}</p>
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập tên',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Tên"
                                    className="input-auth"
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        changeFormField(
                                            form,
                                            'name',
                                            event.target.value,
                                        )
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập email',
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
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập mật khẩu',
                                    },
                                    {
                                        min: 4,
                                        message: 'Mật khẩu ít nhất 4 ký tự',
                                    },
                                ]}
                            >
                                <Input.Password
                                    type="password"
                                    placeholder="Mật khẩu"
                                    className="input-auth"
                                />
                            </Form.Item>
                            <Form.Item
                                name="passwordConfirm"
                                required
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập xác nhận mật khẩu',
                                    },
                                    ({getFieldValue}) => ({
                                        validator(rule, value) {
                                            if (
                                                !value ||
                                                getFieldValue('password') ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            // eslint-disable-next-line prefer-promise-reject-errors
                                            return Promise.reject(
                                                'Mật khẩu không trùng khớp',
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    className="input-auth"
                                />
                            </Form.Item>
                            <div className="signup-form-button">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="form-button"
                                    loading={loading}
                                >
                                    {title}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </InnerAuth>
        </AuthLayout>
    );
}

export default SignUp;
