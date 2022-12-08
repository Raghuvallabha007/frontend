import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productReducer } from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfilrReducer } from './reducers/userReducers';
import { orderCreateReducers, orderDetailsReducers, orderPayReducers } from './reducers/orderReducer'
const reducer = combineReducers({
    ProductList: productListReducer,
    selectedProduct: productReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfilrReducer,
    orderCreate: orderCreateReducers,
    orderDetails: orderDetailsReducers,
    orderPay: orderPayReducers
})
const cartItemsFromStorage =
    localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage =
    localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null;

const ShippingAddressFromStorage =
    localStorage.getItem('ShippingAddress') ?
        JSON.parse(localStorage.getItem('ShippingAddress')) : {};

const PaymentMethodFromStorage =
    localStorage.getItem('PaymentMethod') ?
        JSON.parse(localStorage.getItem('PaymentMethod')) : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: ShippingAddressFromStorage,
        paymentMethod: PaymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;