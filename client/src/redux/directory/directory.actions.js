import directoryActionTypes from "./directory.types";

export const fetchDirectoriesStart = () => {
    return {
        type: directoryActionTypes.FETCH_DIRECTORY_START
    }
}

export const fetchDirectoriesSuccess = (directoriesMap) => {
    return {
        type: directoryActionTypes.FETCH_DIRECTORY_SUCCESS,
        payload: directoriesMap
    }
}

export const fetchDirectoriesFailure = (errorMessage) => {
    return {
        type: directoryActionTypes.FETCH_DIRECTORY_FAILURE,
        payload: errorMessage
    }
}

