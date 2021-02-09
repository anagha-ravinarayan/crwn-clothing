import React from "react";
import { connect } from "react-redux";

import { CollectionItemContainer, ImageContainer, CollectionFooter, Name, Price, StyledCustomButton } from "./collection-item.styles";

import { addItem } from "../../redux/cart/cart.actions";

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    const onAddToCart = () => {
        addItem(item);
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

const mapDispatchToProps = (dispatch) => {
    return ({
        addItem: (item) => {
            dispatch(addItem(item));
        }
    })
}

export default connect(null, mapDispatchToProps)(CollectionItem);