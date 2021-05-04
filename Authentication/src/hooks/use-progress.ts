import * as queryString from 'query-string';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {getToken, getTokenLocal, IToken, removeToken} from '../api/token';
import {STORE_URL} from '../configs/vars';
import {checkNoStore} from '../features/auth/utils';
import {ISearchState, useSearchState} from './use-search-state';

const redirectAppPage = async (token: IToken, searchState: ISearchState) => {
    const isNoStore = await checkNoStore(token);

    let params: any = {
        token: JSON.stringify(token),
        remember: true,
        location: isNoStore ? '/' : searchState.location,
        isHasStore: !isNoStore,
    };

    if (searchState.saleChannel) {
        params = {
            ...params,
            saleChannel: searchState.saleChannel,
        };
    }

    const search = queryString.stringify(params);

    if (isNoStore) {
        window.location.href = `${STORE_URL}save-token?${search}`;
    } else {
        window.location.href = `${searchState.url}?${search}`;
    }
};

const useProgress = () => {
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(true);
    const searchState = useSearchState();
    const {pathname} = history.location;

    const getUrl = (): string => {
        if (pathname === '/sign-up') {
            removeToken();
            return '/sign-up';
        }
        return '/404';
    };

    useEffect(() => {
        if (pathname === '/reset-password') {
            setLoading(false);
            return;
        }

        if (!searchState.url || !searchState.location) {
            history.push(getUrl());
            setLoading(false);
            return;
        }

        if (searchState.isLogout === 'true') {
            removeToken();
            if (searchState.guest === 'true') {
                const search = queryString.stringify({
                    location: searchState.location,
                    guest: true,
                });
                window.location.href = `${searchState.url}?${search}`;
            }
            setLoading(false);
            return;
        }

        const accessToken = getToken('accessToken');
        if (!accessToken) {
            setLoading(false);
            return;
        }

        setLoading(false);

        const token = getTokenLocal();
        if (token) {
            redirectAppPage(token, searchState);
        }
    }, []);

    return loading;
};

export {useProgress, redirectAppPage};
