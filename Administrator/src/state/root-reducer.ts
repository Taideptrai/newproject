import authSlide from '../features/auth/state/authSlide';
import storeSlide from '../features/dashboard/state/storeSlide';
import fanpageSlide from '../features/dashboard/state/fanpageSlide';
import userSlide from '../features/dashboard/state/userSlide';
import ordersSlide from '../features/dashboard/state/ordersSlide';
import billingSlide from '../features/dashboard/state/billingSlide';

const rootReducers = {
    auth: authSlide,
    store: storeSlide,
    fanpage: fanpageSlide,
    user: userSlide,
    order: ordersSlide,
    billing: billingSlide,
};

export default rootReducers;
