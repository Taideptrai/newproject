import { IState, Payment } from './interface';
import { types } from './types';

export const initialState = {
    products: [],
    payments: [],
    customer: undefined,
    shipment: 0,
    customerNote: undefined,
    moneyCustomer: 0,
    isEdit: false,
    delivered: false,
    sale: false,
    isRestrictAction: false,
    createdBy: undefined,
};

interface IAction {
    type: string;
    payload: any;
}

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case types.ADD_PRODUCT: {
            const product = state.products.find((product) => product._id === action.payload._id);

            if (product) {
                state.products = state.products.map((product) => {
                    if (product._id === action.payload._id)
                        return { ...product, count: product.count + 1 };
                    return product;
                });
            } else {
                state.products.unshift({ ...action.payload, count: 1 });
            }

            if (!state.isEdit) {
                state.isEdit = true;
            }

            return;
        }

        case types.REMOVE_PRODUCT:
            state.products = state.products.filter((product) => product._id !== action.payload._id);
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.ADD_CUSTOMER:
            state.customer = action.payload;
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.UPDATE_QUANTITY:
            state.products = state.products.map((product) => {
                if (product._id === action.payload._id) return action.payload;
                return product;
            });

            return;

        case types.ADD_PAYMENT:
            state.payments.push(action.payload);
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.UPDATE_PAYMENT:
            state.payments = state.payments.map((payment: Payment) => {
                if (payment.type === action.payload.type) return action.payload;
                return payment;
            });

            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.REMOVE_PAYMENT: {
            state.payments = state.payments.filter(
                (payment) => payment.type !== action.payload.type
            );
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;
        }

        case types.ADD_CUSTOMER_NOTE:
            state.customerNote = action.payload;
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.CHANGE_DELIVERED:
            state.delivered = action.payload;
            return;

        case types.CHANGE_SALE:
            state.sale = action.payload;
            return;

        case types.ADD_SHIPMENT:
            state.shipment = action.payload;
            if (!state.isEdit) {
                state.isEdit = true;
            }
            return;

        case types.CHANGE_IS_RESTRICT_ACTION: {
            state.isRestrictAction = action.payload;
            return;
        }

        case types.RESET:
            return initialState;

        default:
            return state;
    }
};

export default reducer;
