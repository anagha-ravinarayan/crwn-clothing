import React from "react";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemCount } from "../../redux/cart/cart.selectors";

import { CartIconContainer, StyledShoppingBagIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = ({ itemCount, toggleCartHidden }) => {
    return (
        <CartIconContainer onClick={toggleCartHidden}>
            <StyledShoppingBagIcon />
            <ItemCount>{itemCount}</ItemCount>
        </CartIconContainer>
    )
}

const mapStateToProps = (state) => {
    return ({
        itemCount: selectCartItemCount(state)   // Using selector so that component doesn't get re-rendered if other parts of the state changes
    });
}

const mapDispatchToProps = (dispatch) => {
    return ({
        toggleCartHidden: () => {
            dispatch(toggleCartHidden());
        }
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);