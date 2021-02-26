import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => {
    return ({
        type: CartActionTypes.TOGGLE_CART_HIDDEN
    });
}

export const addItem = (item) => {
    return ({
        type: CartActionTypes.ADD_ITEM,
        payload: item
    });
}

export const removeItem = (item) => {
    return ({
        type: CartActionTypes.REMOVE_ITEM,
        payload: item
    });
}

export const clearItemFromCart = (item) => {
    return ({
        type: CartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: item
    });
}

export const clearCartStart = () => {
    return ({
        type: CartActionTypes.CLEAR_CART_START
    });
}

export const clearCartSuccess = () => {
    return ({
        type: CartActionTypes.CLEAR_CART_SUCCESS
    });
}

export const clearCartFailure = () => {
    return ({
        type: CartActionTypes.CLEAR_CART_FAILURE
    });
}

export const updateCartInFirebase = () => {
    return ({
        type: CartActionTypes.UPDATE_CART_IN_FIREBASE
    });
}

export const pullCartFromFirebase = cartItems => {
    return ({
        type: CartActionTypes.PULL_CART_FROM_FIREBASE,
        payload: cartItems
    });
}