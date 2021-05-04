import { EDeliveryDiscountBy } from '../../../collections/order';
import { Payment, ProductState } from '../pages/sales-counters/state/interface';

export const totalPriceProduct = (products: ProductState[]): number =>
    products.reduce(
        (value: number, product: ProductState) => product.price * product.count + value,
        0
    );
export const paymentValues = (payments: Payment[]): number[] =>
    payments.map((payment: Payment) => {
        return Number(payment.value);
    });

export const totalPayment = (payments: Payment[]): number => {
    return paymentValues(payments).reduce((value: number, item: number) => value + item, 0);
};

export const feeForReceiver = ({
    products,
    payments,
    shipment,
}: {
    products: ProductState[];
    payments: Payment[];
    shipment: number;
}): number => {
    const total = totalPayment(payments) - (totalPriceProduct(products) + shipment);

    return total;
};

export const getShipmentFeeForCustomer = ({
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

export const getValueDiscount = ({
    products,
    discount,
    discountBy,
}: {
    products: any[];
    discount?: number;
    discountBy?: EDeliveryDiscountBy;
}): number => {
    if (!discount || discount === 0) return 0;
    if (discountBy === EDeliveryDiscountBy.Money) return discount;

    const totalPrice = totalPriceProduct(products);

    return (totalPrice * discount) / 100;
};
