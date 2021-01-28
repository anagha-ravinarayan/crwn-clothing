import React from "react";
import { connect } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { selectCartItems, selectCartTotalPrice } from "../../redux/cart/cart.selectors";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, cartTotal }) => {
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(
                    cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )
            }
            <div className="total">
                <span>TOTAL: ${cartTotal}</span>
            </div>
            <div className='payment-warning'>
                * Please use the following test Credit card details for payments *
                <br />
                4242 4242 4242 4242  |  EXP: 01/2022  |  CVV: 123
            </div>
            <StripeCheckoutButton price={cartTotal} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        cartItems: selectCartItems(state),
        cartTotal: selectCartTotalPrice(state),
    });
}

export default connect(mapStateToProps)(CheckoutPage);