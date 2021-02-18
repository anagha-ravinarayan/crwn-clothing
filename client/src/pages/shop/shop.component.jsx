import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../../components/spinner/spinner.component";
import ErrorBoundary from "../../components/error-boundary/error-boundary.component";   // In case network goes down/ some error

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionOverviewContainer = lazy(() => import('../../components/collection-overview/collection-overview.container'));
const CollectionPageContainer = lazy(() => import('./../collection/collection.container'));

const ShopPage = ({ fetchCollections, match }) => {

    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);     // If prop is coming from redux and not from parent component, pass that in the array to avoid warning


    return (
        <div>
            <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                    <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
                    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
                </Suspense>
            </ErrorBoundary>
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