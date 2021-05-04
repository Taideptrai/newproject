export default {
    title: 'Administrator',
    URL_API: process.env.REACT_APP_API_URI,
    URL_AUTH: process.env.REACT_APP_AUTH_URL,
};

export enum EBillingPackageType {
    Trial = 1 << 0,
    Omni = 1 << 1,
    Pos = 1 << 2,
    Facebook = 1 << 3,
    Shopee = 1 << 4,
}

export const ColorPackage = {
    [EBillingPackageType.Pos]: '#6c6fbf',
    [EBillingPackageType.Shopee]: '#f53d2d',
    [EBillingPackageType.Facebook]: '#1877F2',
    [EBillingPackageType.Omni]: '#0885fb',
};

export const AliasPackage = {
    [EBillingPackageType.Pos]: 'INSA POS',
    [EBillingPackageType.Facebook]: 'INSA FACEBOOK',
    [EBillingPackageType.Trial]: 'INSA TRIAL',
    [EBillingPackageType.Shopee]: 'INSA SHOPEE',
    [EBillingPackageType.Omni]: 'OMNI',
};
