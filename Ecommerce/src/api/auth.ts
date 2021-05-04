import {axiosClient} from './axiosClient';

async function getUser(): Promise<any> {
    const url = '/authentication/v1/users/info';

    const response = await axiosClient({
        url,
        method: 'GET',
    });

    return response;
}

async function loginWithEmail(data: any): Promise<any> {
    const url = '/authentication/v1/signin';
    const response = await axiosClient({
        method: 'POST',
        url,
        data,
    });

    return response;
}

export {getUser, loginWithEmail};
