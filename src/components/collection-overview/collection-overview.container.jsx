import { connect } from "react-redux";
import { compose } from "redux";        // function currying library

import CollectionOverview from "./collection-overview.component";
import WithSpinner from "../with-spinner/with-spinner.component";

import { selectIsFetchingCollections } from "../../redux/shop/shop.selectors";

const mapStateToProps = (state) => {
    return ({
        isLoading: selectIsFetchingCollections(state),
    });
}

// export default CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionOverview));
const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;