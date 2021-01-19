import { createSelector } from "reselect";

const selectCart = (state) => state.cart;       // Input Selector

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems          // Iterates over each value in the first array argument
);

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems => {
        return cartItems.reduce((accumulatedQty, cartItem) => accumulatedQty + cartItem.quantity, 0);
    }
)
