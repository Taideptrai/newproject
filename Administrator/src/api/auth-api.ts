import axios from './axios-client';

async function getUser(): Promise<any> {
    const url = '/authentication/v1/users/info';

    const response = await axios({
        url,
        method: 'GET',
    });

    return response;
}

async function loginWithEmail(data: any): Promise<any> {
    const response = await axios({
        method: 'POST',
        url: '/authentication/v1/signin',
        data,
    });

    return response;
}

export default {
    getUser,
    loginWithEmail,
};
