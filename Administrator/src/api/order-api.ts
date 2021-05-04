import axios from './axios-client';

async function loadOrders(
    storeId: string,
    {
        limit,
        page,
        name,
        sort,
        direction,
    }: {
        limit?: number;
        page?: number;
        name?: number;
        sort?: string;
        direction?: string;
    }
): Promise<any> {
    const url = `/administrator/v1/stores/${storeId}/orders`;

    const params = {
        limit,
        page,
        name,
        sort,
        direction,
    };

    const response = await axios({
        url,
        method: 'GET',
        params,
    });

    return response;
}

async function loadOrder(storeId: string, orderId: string): Promise<any> {
    const url = `/store/v1/stores/${storeId}/orders/${orderId}`;

    const response = await axios({
        url,
        method: 'GET',
    });

    return response;
}

export default {
    loadOrders,
    loadOrder,
};
