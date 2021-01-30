import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectShopCollection } from "../../redux/shop/shop.selectors";

import {CollectionPageContainer, Title, CollectionItems} from "./collection.styles";

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <CollectionPageContainer>
            <Title>{title}</Title>
            <CollectionItems>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </CollectionItems>
        </CollectionPageContainer>
    );
}

const mapStateToProps = (state, ownProps) => {          // Second argument is the props of the component being wrapped in connect
    return ({
        collection: selectShopCollection(ownProps.match.params.collectionId)(state)     // selectShopCollection returns a selector that in turn accepts state as an argument
    });
}

export default connect(mapStateToProps)(CollectionPage);