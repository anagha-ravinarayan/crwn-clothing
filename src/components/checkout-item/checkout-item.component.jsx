import React from "react";
import { connect } from "react-redux";

import { CheckoutItemContainer, ImageContainer, Image, Name, Quantity, Arrow, Value, Price, RemoveButton } from "./checkout-item.styles";
import { addItem, removeItem, clearItemFromCart } from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItemFromCart }) => {
    const { name, price, imageUrl, quantity } = cartItem;
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt='item' />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={() => removeItem(cartItem)}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={() => addItem(cartItem)}>&#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={() => clearItemFromCart(cartItem)}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        addItem: (item) => dispatch(addItem(item)),
        removeItem: (item) => dispatch(removeItem(item)),
        clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
    });
}

export default connect(null, mapDispatchToProps)(CheckoutItem);