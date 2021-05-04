import { IPackage } from '../collections/billing';
import axiosClient from './axios-client';

export enum EBillingPackageType {
    Trial = 1 << 0,
    Omni = 1 << 1,
    Pos = 1 << 2,
    Facebook = 1 << 3,
    Shopee = 1 << 4,
}

export async function getPackagesActive(storeId: string): Promise<any> {
    const response = await axiosClient({
        method: 'GET',
        url: `/store/v1/stores/${storeId}/billing-stores`,
    });

    return response;
}