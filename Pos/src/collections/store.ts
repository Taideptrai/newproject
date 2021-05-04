import { ESaleChannel } from './sale-channel';

export interface IStore {
    _id: string;
    name: string;
    ownerId: any;
    phoneNo: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    code: string;
    warehouseId: string;
    provinceName: string;
    districtName: string;
    wardName: string;
    role: number;
    saleChannels: ESaleChannel[];
}
