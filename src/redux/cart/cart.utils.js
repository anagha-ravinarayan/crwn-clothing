export const addItemToCart = (currentCartItems, cartItemToAdd) => {
    const existingCartItem = currentCartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (existingCartItem) {
        // Need to map over entire cartItems array and return a new cartItems array for react to re-render
        return currentCartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...currentCartItems, { ...cartItemToAdd, quantity: 1 }];
}