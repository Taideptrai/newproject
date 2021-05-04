export interface IStore {
    _id: string;
    name: string;
}

export interface IBilling {
    _id: string;
    active: boolean;
    storeId: IStore;
    packageType: number;
    paymentType: number;
    bonusPeriod?: number;
    period: number;
    createdAt: string;
    total: number;
    transactionCode: string;
}