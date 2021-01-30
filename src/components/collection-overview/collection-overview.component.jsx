import React from "react";
import { connect } from "react-redux";

import { selectShopCollectionsForPreview } from "../../redux/shop/shop.selectors";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import { CollectionOverviewContainer } from "./collection-overview.styles";

const CollectionOverview = ({ collections }) => {
    return (
        <CollectionOverviewContainer>
            {collections.map(({ id, ...otherCollectionProps }) => {
                return (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                );
            })}
        </CollectionOverviewContainer>
    );
}

const mapStateToProps = (state) => {
    return ({
        collections: selectShopCollectionsForPreview(state)
    });
}

export default connect(mapStateToProps)(CollectionOverview);