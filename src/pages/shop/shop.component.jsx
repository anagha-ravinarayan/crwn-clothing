import React from "react";
import { connect } from "react-redux";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import { selectShopCollections } from "../../redux/shop/shop.selectors";

const ShopPage = ({ collections }) => {
    return (
        <div>
            {collections.map(({ id, ...otherCollectionProps }) => {
                return (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                );
            })}
        </div>
    );
}

const mapStateToProps = (state) => {
    return ({
        collections: selectShopCollections(state)
    });
}

export default connect(mapStateToProps)(ShopPage);