import React from "react";
import { connect } from "react-redux";

import StripeCheckout from "react-stripe-checkout";
import { clearCartStart } from "../../redux/cart/cart.actions";

const StripeCheckoutButton = ({ price, clearCart }) => {
    const priceForStripe = price * 100;     // Stripe requires in cents
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

    const onToken = (token) => {
        // console.log(token);
        alert("Payment Successful!");
        clearCart();
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        clearCart: () => {
            dispatch(clearCartStart());
        }
    });
}

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);