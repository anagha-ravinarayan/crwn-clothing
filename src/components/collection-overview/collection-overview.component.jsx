import React from "react";
import { connect } from "react-redux";

import { selectShopCollectionsForPreview } from "../../redux/shop/shop.selectors";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import "./collection-overview.styles.scss";

const CollectionOverview = ({ collections }) => {
    return (
        <div className='collection-overview'>
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
        collections: selectShopCollectionsForPreview(state)
    });
}

export default connect(mapStateToProps)(CollectionOverview);