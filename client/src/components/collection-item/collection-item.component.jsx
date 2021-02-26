import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CollectionItemContainer, ImageContainer, CollectionFooter, Name, Price, StyledCustomButton } from "./collection-item.styles";

import { addItem } from "../../redux/cart/cart.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const CollectionItem = ({ item, addItem, currentUser, history }) => {
    const { name, price, imageUrl } = item;

    const onAddToCart = () => {
        currentUser
            ? addItem(item)
            : history.push("/signin");
    }

    return (
        <CollectionItemContainer>
            <ImageContainer imageUrl={imageUrl} />
            <CollectionFooter>
                <Name>{name}</Name>
                <Price>${price}</Price>
            </CollectionFooter>
            <StyledCustomButton onClick={onAddToCart} inverted>ADD TO CART</StyledCustomButton>
        </CollectionItemContainer>
    );
}

const mapStateToProps = (state) => {
    return ({
        currentUser: selectCurrentUser(state)
    });
}
const mapDispatchToProps = (dispatch) => {
    return ({
        addItem: (item) => {
            dispatch(addItem(item));
        }
    });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionItem));