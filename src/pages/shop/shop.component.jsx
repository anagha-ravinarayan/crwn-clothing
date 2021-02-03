import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { updateCollections } from "../../redux/shop/shop.actions"

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    unsubscribeFromSnapshot = null;
    state = {
        isLoading: true
    };

    componentDidMount() {
        const { updateShopCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async (snapshot) => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateShopCollections(collectionsMap);
            this.setState({ isLoading: false });
        });
    }

    render() {
        const { match } = this.props;
        const { isLoading } = this.state;
        return (
            <div>
                <Route exact path={`${match.path}`}
                    render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />} />
                <Route path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner isLoading={isLoading} {...props} />} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateShopCollections: (collectionsMap) => {
            dispatch(updateCollections(collectionsMap));
        }
    }
}

export default connect(null, mapDispatchToProps)(ShopPage);