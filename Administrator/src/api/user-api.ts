import axios from './axios-client';

async function loadUsers({
    limit = 10,
    page = 1,
    search,
    sort = 'createAt',
    direction = 'desc',
}: {
    limit?: number;
    page?: number;
    search?: number;
    sort?: string;
    direction?: string;
}): Promise<any> {
    const url = `/administrator/v1/users`;

    const params = {
        limit,
        page,
        search,
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

export default {
    loadUsers,
};
