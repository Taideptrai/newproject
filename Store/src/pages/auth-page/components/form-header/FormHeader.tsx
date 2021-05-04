import { message } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import LoginIcon from '../../../../assets/login.svg';
import LoginFacebookBtn from '../../../../components/login-facebook';
import LoginGoogleBtn from '../../../../components/login-google';
import { loginActionWithService } from '../../../../reducers/authState/authAction';
import './form-header.less';

interface Props {
    title: string;
}

const FormHeader: FC<Props> = ({ title }) => {
    const dispatch = useDispatch();

    const handleSocialLogin = (response: any, service?: string): void => {
        const { accessToken } = response;
        if (accessToken) {
            dispatch(loginActionWithService({ accessToken }, service));
            localStorage.setItem('shortLiveToken', accessToken);
        } else {
            message.error('Đăng ký không thành công.');
        }
    };

    const loginFacebook = (data: any) => {
        handleSocialLogin(data, 'facebook');
    };

    const loginGoogle = (data: any) => {
        handleSocialLogin(data, 'google');
    };

    return (
        <div className="form-header">
            <p className="page-title">{title}</p>
            <img src={LoginIcon} alt="" />
            <div className="form-header-social">
                <LoginFacebookBtn loginFacebook={loginFacebook} title="" />
                <LoginGoogleBtn loginGoogle={loginGoogle} title="" />
            </div>
        </div>
    );
};

export default FormHeader;
