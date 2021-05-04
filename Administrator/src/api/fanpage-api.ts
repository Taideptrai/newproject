import axios from './axios-client';

async function loadFanpage({
    limit = 10,
    page = 1,
    name,
    sort = 'createdAt',
    direction = 'desc',
}: {
    limit?: number;
    page?: number;
    name?: number;
    sort?: string;
    direction?: string;
}): Promise<any> {
    const url = `/administrator/v1/fbpages`;

    const params = {
        limit,
        page,
        name,
        sort,
        direction,
    };

    const response = await axios({
        method: 'GET',
        url,
        params,
    });

    return response;
}

async function updateFanpageRequest({
    expiredAt,
    fanpageId,
}: {
    expiredAt: string;
    fanpageId: string;
}): Promise<any> {
    const url = `/administrator/v1/fbpages/${fanpageId}`;

    const data = {
        expiredAt,
    };

    const response = await axios({
        method: 'PUT',
        url,
        data,
    });
    return response;
}

export default {
    loadFanpage,
    updateFanpageRequest,
};
