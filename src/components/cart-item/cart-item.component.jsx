import React from "react";

import { CartItemContainer, Image, ItemDetails, CartItemName } from "./cart-item.styles";

const CartItem = ({ item: { name, price, imageUrl, quantity } }) => {
    return (
        <CartItemContainer>
            <Image src={imageUrl} alt='item' />
            <ItemDetails>
                <CartItemName>{name}</CartItemName>
                <span>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;