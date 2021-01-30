import React from "react";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";

import { HeaderContainer, LogoContainer, OptionsContainer, Option } from "./header.styles";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, cartHidden }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo />
            </LogoContainer>
            <OptionsContainer>
                <Option to="/shop">SHOP</Option>
                <Option to="/contact">CONTACT</Option>
                {
                    currentUser
                        ? <Option as='div' onClick={() => auth.signOut()}>SIGN OUT</Option>
                        : <Option to="/signin">SIGN IN</Option>
                }
                <CartIcon />
            </OptionsContainer>
            {
                !cartHidden && <CartDropdown />
            }
        </HeaderContainer>
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