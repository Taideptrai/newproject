import axios from './axios-client';

async function loadStores({
    limit = 10,
    page = 1,
    name,
    sort = 'createAt',
    direction = 'desc',
}: {
    limit?: number;
    page?: number;
    name?: number;
    sort?: string;
    direction?: string;
}): Promise<any> {
    const url = `/administrator/v1/stores`;

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

async function loadStore({ storeId }: { storeId: string }): Promise<any> {
    const url = `/administrator/v1/stores/${storeId}`;

    const response = await axios({
        method: 'GET',
        url,
    });

    return response;
}

async function loadNewBillings({
    limit = 10,
    page = 1,
    name,
    sort = 'createAt',
    direction = 'desc',
}: {
    limit?: number;
    page?: number;
    name?: number;
    sort?: string;
    direction?: string;
}): Promise<any> {
    const url = `/administrator/v1/admin/billing-stores`;

    const params = {
        limit,
        page,
    };

    const response = await axios({
        method: 'GET',
        url,
        params,
    });

    return response;
}

async function approveBilling({ billingId }: { billingId: string }): Promise<any> {
    const url = `/administrator/v1/admin/billing-stores/${billingId}/approve`;

    const response = await axios({
        method: 'POST',
        url,
        data: {},
    });
    return response;
}

export default {
    loadStores,
    loadStore,
    loadNewBillings,
    approveBilling,
};
