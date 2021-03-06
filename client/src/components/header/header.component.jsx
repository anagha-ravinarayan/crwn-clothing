import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { HeaderContainer, LogoContainer, OptionsContainer, Option } from "./header.styles";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { signOutStart } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

const Header = ({ dispatch, currentUser, cartHidden, history }) => {
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
                        ? <Option as='div' onClick={() => {
                            dispatch(signOutStart());
                            history.push("/");
                        }}>SIGN OUT</Option>
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

export default withRouter(connect(mapStateToProps)(Header));