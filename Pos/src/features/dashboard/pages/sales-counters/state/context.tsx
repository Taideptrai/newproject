import React, { createContext, FC, ReactNode, useCallback, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getPackagesActive } from '../../../../../api/billing-api';
import { IPackage } from '../../../../../collections/billing';
import { ICustomer } from '../../../../../collections/customer';
import useImmerReducer from '../../../../../hook/useImmerReducer';
import { checkRestrictAction } from '../../../../../utils/get-time';
import { IContext, Payment, ProductState } from './interface';
import reducer, { initialState } from './reducer';
import { types } from './types';

const intialContext = {
    state: initialState,
    dispatch: () => null,
};

const Context = createContext<IContext>(intialContext);

interface Props {
    children: ReactNode;
}

const ProviderContext: FC<Props> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, initialState);

    // eslint-disable-next-line
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSalesCounter = () => {
    const value = useContext(Context);
    const { state, dispatch } = value;

    const store = useSelector((state: any) => state.store.store);

    const getPackages = async () => {
        const packages: IPackage[] = await getPackagesActive(store._id);
        const pkgsActive = packages.filter((item: IPackage) => item.active);

        dispatch({
            type: types.CHANGE_IS_RESTRICT_ACTION,
            payload: checkRestrictAction(pkgsActive),
        });
    };

    const addProduct = useCallback((product: ProductState) => {
        dispatch({
            type: types.ADD_PRODUCT,
            payload: product,
        });
        // eslint-disable-next-line
    }, []);

    const removeProduct = (product: ProductState) => {
        dispatch({
            type: types.REMOVE_PRODUCT,
            payload: product,
        });
    };

    const updateCount = useCallback((product: ProductState) => {
        dispatch({
            type: types.UPDATE_QUANTITY,
            payload: product,
        });

        // eslint-disable-next-line
    }, []);

    const addCustomer = useCallback((customer: ICustomer) => {
        dispatch({
            type: types.ADD_CUSTOMER,
            payload: customer,
        });

        // eslint-disable-next-line
    }, []);

    const addPayment = useCallback((payment: Payment) => {
        dispatch({
            type: types.ADD_PAYMENT,
            payload: payment,
        });

        // eslint-disable-next-line
    }, []);

    const updatePayment = useCallback((payment: Payment) => {
        dispatch({
            type: types.UPDATE_PAYMENT,
            payload: payment,
        });

        // eslint-disable-next-line
    }, []);

    const removePayment = useCallback((payment: Payment) => {
        dispatch({
            type: types.REMOVE_PAYMENT,
            payload: payment,
        });

        // eslint-disable-next-line
    }, []);

    const addShipment = useCallback((shipment: number) => {
        dispatch({
            type: types.ADD_SHIPMENT,
            payload: shipment,
        });

        // eslint-disable-next-line
    }, []);

    const addCustomerNote = useCallback((note: string) => {
        dispatch({
            type: types.ADD_CUSTOMER_NOTE,
            payload: note,
        });

        // eslint-disable-next-line
    }, []);

    const changeDelivered = useCallback((check: boolean) => {
        dispatch({
            type: types.CHANGE_DELIVERED,
            payload: check,
        });

        // eslint-disable-next-line
    }, []);

    const changeSale = useCallback((check: boolean) => {
        dispatch({
            type: types.CHANGE_SALE,
            payload: check,
        });

        // eslint-disable-next-line
    }, []);

    const resetOrder = useCallback(() => {
        dispatch({
            type: types.RESET,
        });

        // eslint-disable-next-line
    }, []);

    return {
        ...state,
        addProduct,
        removeProduct,
        updateCount,
        addCustomer,
        addPayment,
        updatePayment,
        removePayment,
        addShipment,
        addCustomerNote,
        resetOrder,
        changeDelivered,
        changeSale,
        getPackages,
    };
};

export default ProviderContext;
