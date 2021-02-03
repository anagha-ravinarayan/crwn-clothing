import { connect } from "react-redux";
import { compose } from "redux";        // function currying library

import CollectionPage from "./collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

const mapStateToProps = (state) => {
    return ({
        isLoading: !(selectIsCollectionsLoaded(state))
    });
}

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;