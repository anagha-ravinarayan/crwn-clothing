import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionPageContainer from "./../collection/collection.container";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const ShopPage = ({ fetchCollections, match }) => {

    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);     // If prop is coming from redux and not from parent component, pass that in the array to avoid warning


    return (
        <div>
            <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchCollections: () => {
            dispatch(fetchCollectionsStart());
        }
    });
}

export default connect(null, mapDispatchToProps)(ShopPage);