import { Button, message } from 'antd';
import { find, get, isEmpty, omit, pick } from 'lodash';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateOrder } from '../../../api/order-api';
import storeApi from '../../../api/store-api';
import { useOrder } from '../../conversation/conversation-customer/context-order';
import { getFee } from '../../conversation/conversation-customer/util';
import livestreamApi from '../../../api/livestream-api';
import shippingApi from '../../../api/shipping-api';

interface Props {
    title?: string;
    fbPageId: string;
    customerId?: string;
    isNew?: boolean;
    scriptId: string;
    toggle: () => void;
    reloadCustomer: () => void;
}

const BtnSave: FC<Props> = ({
    title = 'Giao hàng',
    fbPageId,
    customerId,
    isNew = false,
    scriptId,
    toggle,
    reloadCustomer,
}) => {
    const [loading, setLoading] = useState(false);
    const store = useSelector((state: any) => state.store.store);
    const token = useSelector((state: any) => state.auth.token);
    const pages = useSelector((state: any) => state.fanpage.pages);

    const { order } = useOrder();

    const createOrderShip = async (newOrder: any) => {
        const totalWeight = newOrder.products.reduce(
            (value: number, o: any) => o.productId.weight * o.count + value,
            0
        );

        let minWeight = newOrder.deliveryOptions.serviceId == 1 ? 10 : 1;
        let maxWeight = newOrder.deliveryOptions.serviceId == 1 ? 20000 : 1600000;

        if (totalWeight < minWeight) {
            message.error(`Tổng khối lượng của sản phẩm chưa đạt mức tối thiểu ${minWeight}g`);
            return;
        } else if (totalWeight > maxWeight) {
            message.error(`Tổng khối lượng của sản phẩm vượt mức tối đa ${maxWeight / 1000}kg`);
            return;
        }

        const response = await shippingApi.toggleCreateOrderShip({
            token: token.accessToken,
            storeId: store._id,
            orderId: newOrder._id,
            cancel: false,
            warehouseId: newOrder.warehouseId,
        });

        return response;
    };

    const createNewOrder = async () => {
        try {
            setLoading(false);
            const page = find(pages, (p: any) => p.fbObjectId === fbPageId);

            if (isEmpty(customerId)) {
                const dataCustomer = {
                    ...pick(order.customer, [
                        'name',
                        'phoneNo',
                        'address',
                        'province',
                        'district',
                        'ward',
                    ]),
                    fbPageId: page._id,
                    fbUserId: order.customer.fbUserId,
                };
                const newCustomer = await storeApi.createCustomer({
                    token: token.accessToken,
                    storeId: store._id,
                    data: dataCustomer,
                });

                order.customer = newCustomer;
            }

            const products = order.products.map((p: any) =>
                pick(p, ['count', 'productId', 'price'])
            );

            const valueShipmentFeeForCustomer = get(
                order,
                'deliveryOptions.shipmentFeeForCustomer'
            );

            const shipmentFeeForCustomer =
                !valueShipmentFeeForCustomer || valueShipmentFeeForCustomer === 0
                    ? get(order, 'deliveryOptions.shipmentFee')
                    : valueShipmentFeeForCustomer;

            const data = {
                products,
                customer: pick(order.customer, [
                    '_id',
                    'fbUserId',
                    'name',
                    'phoneNo',
                    'address',
                    'province',
                    'district',
                    'ward',
                ]),
                fbPageId,
                deliveryOptions: {
                    ...pick(order.deliveryOptions, [
                        'shipmentFee',
                        'discount',
                        'discountBy',
                        'noteForDelivery',
                    ]),
                    shipmentFeeForCustomer,
                    serviceId: order.deliveryOptions.serviceId || 0,
                    transportType: order.deliveryOptions.transportType || 0,
                    customerNote:
                        order.deliveryOptions.customerNote.length > 0
                            ? order.deliveryOptions.customerNote
                            : undefined,
                    noteForCustomerCare:
                        order.deliveryOptions.noteForCustomerCare.length > 0
                            ? order.deliveryOptions.noteForCustomerCare
                            : undefined,

                    feeForReceiver: getFee(order).feeForReceiver,
                    shipmentFeeByTotal: true,
                },
                warehouseId: order.warehouseId,
            };

            const response = await storeApi.createOrder({
                storeId: store._id,
                token: token.accessToken,
                data,
            });

            await livestreamApi.updateOrderIdInComment({
                storeId: store._id,
                fbPageId,
                scriptId,
                data: {
                    fbUserId: order.customer.fbUserId,
                    orderId: response._id,
                },
            });

            await createOrderShip(response);

            setLoading(false);
            message.success('Đã tạo đơn giao hàng');
            toggle();
            reloadCustomer();
        } catch (error) {
            setLoading(false);
            message.error('Lỗi tạo đơn giao hàng');
        }
    };

    const notValidDelivery = () => {
        const hasSelectDelivery =
            order.deliveryOptions.serviceId && order.deliveryOptions.serviceId !== 0;

        if (
            (hasSelectDelivery && !order.deliveryOptions.transportType) ||
            (hasSelectDelivery && typeof order.deliveryOptions.noteForDelivery === 'undefined')
        ) {
            return true;
        }

        return false;
    };

    const checkValid = () => {
        if (
            order.customer.name.length === 0 ||
            !order.customer.phoneNo ||
            order.customer.phoneNo.length === 0 ||
            typeof order.customer.province === 'undefined' ||
            typeof order.customer.district === 'undefined' ||
            typeof order.customer.ward === 'undefined' ||
            typeof order.warehouseId === 'undefined' ||
            order.products.length === 0 ||
            notValidDelivery()
        )
            return false;

        return true;
    };

    const handleUpdateOrder = async () => {
        setLoading(true);
        const products = order.products.map((p: any) => {
            return {
                count: p.count,
                productId: p._id || p.productId,
                price: p.price,
            };
        });

        const { feeForReceiver } = getFee(order);

        const shipmentFeeForCustomer =
            get(order, 'deliveryOptions.shipmentFeeForCustomer', 0) === 0
                ? get(order, 'deliveryOptions.shipmentFee', 0)
                : get(order, 'deliveryOptions.shipmentFeeForCustomer', 0);

        try {
            const deliveryOptions = {
                ...pick(order.deliveryOptions, [
                    'discount',
                    'discountBy',
                    'serviceId',
                    'shipmentFee',
                    'shipmentFeeByTotal',
                    'transportType',
                    'noteForDelivery',
                ]),
                shipmentFeeForCustomer,
                feeForReceiver,
                customerNote:
                    order.deliveryOptions.customerNote &&
                    order.deliveryOptions.customerNote.length > 0
                        ? order.deliveryOptions.customerNote
                        : undefined,
                noteForCustomerCare:
                    order.deliveryOptions.noteForCustomerCare &&
                    order.deliveryOptions.noteForCustomerCare.length > 0
                        ? order.deliveryOptions.noteForCustomerCare
                        : undefined,
                shipmentOrderId: (order as any).deliveryOptions.shipmentOrderId
                    ? (order as any).deliveryOptions.shipmentOrderId
                    : undefined,
            };

            let data: any = {
                customer: omit(order.customer, [
                    '_id',
                    'fbUserId',
                    'provinceName',
                    'districtName',
                    'wardName',
                    'note',
                ]),
                deliveryOptions,
                products,
                warehouseId: (order as any).warehouseId,
                isDraft: false,
            };

            const response = await updateOrder({
                token: token.accessToken,
                storeId: store._id,
                orderId: (order as any)._id,
                data,
            });

            await createOrderShip(response);

            message.success('Đã tạo đơn giao hàng');

            setLoading(false);

            toggle();
            reloadCustomer();
        } catch (error) {
            message.error('Lỗi tạo đơn giao hàng');
            setLoading(false);
        }
    };

    const handleOnClick = async () => {
        if (isNew) {
            createNewOrder();
        } else {
            handleUpdateOrder();
        }
    };

    return (
        <Button type='primary' onClick={handleOnClick} loading={loading} disabled={!checkValid()}>
            {title}
        </Button>
    );
};

export default BtnSave;
