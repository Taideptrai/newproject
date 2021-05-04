import axios from './axios-client';

async function loadStore(): Promise<any> {
    const url = '/store/v1/stores';

    const response = await axios({
        method: 'GET',
        url,
    });

    return response;
}

export default {
    loadStore,
};
