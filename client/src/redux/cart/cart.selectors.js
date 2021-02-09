import { createSelector } from "reselect";

const selectCart = (state) => state.cart;       // Input Selector

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems          // Iterates over each value in the first array argument
);

export const selectCartItemCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((accumulatedQty, cartItem) => accumulatedQty + cartItem.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((accumulatedPrice, cartItem) => accumulatedPrice + (cartItem.quantity * cartItem.price), 0)
);