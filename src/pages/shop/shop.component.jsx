import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionPageContainer from "./../collection/collection.container";

import { fetchCollectionsAsync } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsAsync } = this.props;
        fetchCollectionsAsync();
    }

    render() {
        const { match } = this.props;
        return (
            <div>
                <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchCollectionsAsync: () => {
            dispatch(fetchCollectionsAsync());
        }
    });
}

export default connect(null, mapDispatchToProps)(ShopPage);