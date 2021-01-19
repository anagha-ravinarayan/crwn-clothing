import React from "react";
import { connect } from "react-redux";

import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg"
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemCount } from "../../redux/cart/cart.selectors";

import "./cart-icon.styles.scss";

const CartIcon = ({ itemCount, toggleCartHidden }) => {
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingBagIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
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