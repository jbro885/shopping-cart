import Checkout from './utils/Checkout';

// Create the Checkout Singleton
const co = new Checkout();
// We freeze the reference
Object.freeze(co);

export const initialState = {
    isLoading: false,
    products: [],
    discounts: [],
    cart: {},
    cartSize: 0,
    rawCost: 0,
    totalCost: 0,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'INITIAL_DATA_FETCHING':
            return {
                ...state,
                isLoading: true,
            };
        case 'INITIAL_DATA_FETCHED':
            co.loadProducts(action.payload.products);
            co.loadDiscounts(action.payload.discounts);
            debugger;
            return {
                ...initialState,
                products: co.products,
                discounts: co.listDiscounts(),
                isLoading: false,
            };
        case 'ADD_PRODUCT_TO_CART':
            co.scan(action.payload.code);
            return {
                ...state,
                cart: co.getCart(),
                cartSize: co.cartSize(),
                rawCost: co.rawTotal(),
                discounts: co.listDiscounts(),
                totalCost: co.total(),
            };
        case 'REMOVE_PRODUCT_FROM_CART':
            co.remove(action.payload.code);
            return {
                ...state,
                cart: co.getCart(),
                cartSize: co.cartSize(),
                rawCost: co.rawTotal(),
                discounts: co.listDiscounts(),
                totalCost: co.total(),
            };
        case 'CHECKOUT': // We shoud proceed to the payment details.
            co.clearCart();
            return {
                ...initialState,
                products: co.products,
                discounts: co.listDiscounts(),
                cart: co.getCart(),
            };
        default:
            throw new Error('Unexpected action');
    }
};