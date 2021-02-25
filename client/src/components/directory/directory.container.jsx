import { connect } from "react-redux";
import { compose } from "redux";

import Directory from "./directory.component";
import WithSpinner from "../with-spinner/with-spinner.component";

import { selectIsDirectoriesLoaded } from "../../redux/directory/directory.selectors";

const mapStateToProps = (state) => {
    return ({
        isLoading: !selectIsDirectoriesLoaded(state)
    });
}

const DirectoryContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(Directory);

export default DirectoryContainer;