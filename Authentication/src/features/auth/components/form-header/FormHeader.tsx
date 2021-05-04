import {message} from 'antd';
import {get} from 'lodash';
import * as queryString from 'query-string';
import React, {FC} from 'react';
import {useHistory} from 'react-router-dom';
import {connectFanpageApi} from '../../../../api';
import {loginActionWithService} from '../../../../api/auth';
import {IToken, setToken} from '../../../../api/token';
import LoginIcon from '../../../../assets/icon/login.svg';
import LoginFacebookBtn from '../../../../components/login-facebook';
import LoginGoogleBtn from '../../../../components/login-google';
import {STORE_URL} from '../../../../configs/vars';
import {getStoreId} from '../../utils';
import './form-header.less';

interface Props {
    title: string;
    showSocialLogin?: boolean;
}

const FormHeader: FC<Props> = ({title, showSocialLogin = true}) => {
    const history = useHistory();

    const searchState: {
        url?: string;
        location?: string;
        isLogout?: string;
    } = queryString.parse(history.location.search);

    const redirectAppPage = async ({
        token,
        noStore,
    }: {
        token: IToken;
        noStore: boolean;
    }) => {
        const params = {
            token: JSON.stringify(token),
            remember: true,
            location: noStore ? '/' : searchState.location,
        };

        const search = queryString.stringify(params);

        if (noStore) {
            window.location.href = `${STORE_URL}?${search}`;
        } else {
            window.location.href = `${searchState.url}?${search}`;
        }
    };

    const handleSocialLogin = async (
        response: any,
        service?: string,
    ): Promise<any> => {
        const {accessToken} = response;
        if (accessToken) {
            const responseLogin = await loginActionWithService(
                {accessToken},
                service,
            );

            if (get(responseLogin, 'accessToken')) {
                await setToken({
                    token: responseLogin as IToken,
                    remember: true,
                });

                const storeId = await getStoreId(responseLogin);

                if (!storeId) {
                    redirectAppPage({token: responseLogin, noStore: true});
                } else {
                    await connectFanpageApi({
                        payload: {shortLiveToken: accessToken},
                        storeId,
                        token: get(responseLogin, 'accessToken'),
                    });
                    redirectAppPage({token: responseLogin, noStore: false});
                }
            }
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
            {showSocialLogin && (
                <div className="form-header-social">
                    <LoginFacebookBtn loginFacebook={loginFacebook} title="" />
                    <LoginGoogleBtn loginGoogle={loginGoogle} title="" />
                </div>
            )}
        </div>
    );
};

export default FormHeader;
