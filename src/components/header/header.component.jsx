import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, cartHidden }) => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/contact">CONTACT</Link>
                {
                    currentUser
                        ? <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                        : <Link className="option" to="/signin">SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {
                !cartHidden && <CartDropdown />
            }
        </div>
    )
}

// Map the state from Redux store to the props of Header component
const mapStateToProps = (state) => {
    return ({
        currentUser: selectCurrentUser(state),
        cartHidden: selectCartHidden(state)
    });
}
export default connect(mapStateToProps)(Header);