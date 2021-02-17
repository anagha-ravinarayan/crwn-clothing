import React from "react";
import { connect } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { selectCartItems, selectCartTotalPrice } from "../../redux/cart/cart.selectors";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import { CheckoutPageContainer, CheckoutHeader, HeaderBlock, Total, PaymentWarning } from "./checkout.styles";

const CheckoutPage = ({ cartItems, cartTotal }) => {
    return (
        <CheckoutPageContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map(
                    cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )
            }
            <Total>
                <span>TOTAL: $ {cartTotal}</span>
            </Total>
            <PaymentWarning>
                * Please use the following test Credit card details for payments *
                <br />
                4242 4242 4242 4242  |  EXP: 01/2022  |  CVV: 123
            </PaymentWarning>
            <StripeCheckoutButton price={cartTotal} />
        </CheckoutPageContainer>
    )
}

const mapStateToProps = (state) => {
    return ({
        cartItems: selectCartItems(state),
        cartTotal: selectCartTotalPrice(state),
    });
}

export default connect(mapStateToProps)(CheckoutPage);