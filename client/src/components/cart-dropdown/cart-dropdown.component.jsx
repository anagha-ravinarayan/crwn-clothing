import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import {CartDropdownContainer, CartItems, EmptyCartMessage, StyledCustomButton } from "./cart-dropdown.styles";


const CartDropdown = ({ cartItems, dispatch, history, location, match }) => {       // dispatch is a default prop if second arg to connect isn't specified
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length
                        ? (cartItems.map(cartItem =>
                            <CartItem key={cartItem.id} item={cartItem} />))
                        : (<EmptyCartMessage>Your cart is empty</EmptyCartMessage>)
                }
            </CartItems>
            <StyledCustomButton onClick={() => {
                history.push("/checkout");
                dispatch(toggleCartHidden());
            }}>GO TO CHECKOUT</StyledCustomButton>
        </CartDropdownContainer>
    )
}

const mapStateToProps = (state) => {
    return ({
        cartItems: selectCartItems(state)
    });
}

export default withRouter(connect(mapStateToProps)(CartDropdown));