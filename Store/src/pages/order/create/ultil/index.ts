import { EDeliveryDiscountBy } from '../../../../models/order';
import { IProductState } from '../state/interface';

const getMoneyProduct = (products: IProductState[]): number =>
    products.reduce(
        (value: number, product) => (product.price as number || 0) * product.count + value,
        0
    );

const getValueDiscount = ({
    products,
    discount,
    discountBy,
}: {
    products: IProductState[];
    discount?: number;
    discountBy?: EDeliveryDiscountBy;
}): number => {
    if (!discount || discount === 0) return 0;
    if (discountBy === EDeliveryDiscountBy.Money) return discount;

    const money_product = getMoneyProduct(products);

    return (money_product * discount) / 100;
};

const getShipmentFeeForCustomer = ({
    shipmentFeeForCustomer,
    shipmentFee,
}: {
    shipmentFeeForCustomer?: number;
    shipmentFee?: number;
}): number => {
    if (shipmentFeeForCustomer && shipmentFeeForCustomer > 0) {
        return shipmentFeeForCustomer;
    }

    return shipmentFee || 0;
};

const getFeeForReceiver = ({
    products,
    discount,
    discountBy,
    shipmentFee,
    shipmentFeeForCustomer,
}: {
    products: IProductState[];
    discount?: number;
    discountBy?: EDeliveryDiscountBy;
    shipmentFee?: number;
    shipmentFeeForCustomer?: number;
}): number => {
    const money_product = getMoneyProduct(products);
    const value_discount = getValueDiscount({
        products,
        discount,
        discountBy,
    });
    return Math.ceil(
        money_product +
        getShipmentFeeForCustomer({ shipmentFeeForCustomer, shipmentFee }) -
        value_discount -
        (shipmentFee || 0)
    );
};

export { getMoneyProduct, getValueDiscount, getShipmentFeeForCustomer, getFeeForReceiver };
