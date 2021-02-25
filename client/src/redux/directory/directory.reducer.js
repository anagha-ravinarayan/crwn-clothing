import directoryActionTypes from "./directory.types";
import { addPropertiesToDirectories } from "./directory.utils";

const INITIAL_STATE = {
    directories: [],
    isFetching: false,
    errorMessage: undefined,
}

const DirectoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case directoryActionTypes.FETCH_DIRECTORY_START:
            return {
                ...state,
                isFetching: true
            }

        case directoryActionTypes.FETCH_DIRECTORY_SUCCESS:
            return {
                ...state,
                directories: addPropertiesToDirectories(action.payload),
                isFetching: false
            }

        case directoryActionTypes.FETCH_DIRECTORY_FAILURE:
            return {
                ...state,
                errorMessage: action.payload,
                isFetching: false
            }

        default:
            return state;
    }
}

export default DirectoryReducer;