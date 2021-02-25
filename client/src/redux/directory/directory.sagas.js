import { takeLatest, put, all, call } from "redux-saga/effects";

import { firestore, convertDirectorySnapshotToArray } from "../../firebase/firebase.utils";

import directoryActionTypes from "./directory.types";
import { fetchDirectoriesFailure, fetchDirectoriesSuccess } from "./directory.actions"

function* fetchDirectories() {
    try {
        const collectionRef = firestore.collection('directories');
        const snapshot = yield collectionRef.get();             // native firestore method to fetch snapshot
        const directoriesMap = yield call(convertDirectorySnapshotToArray, snapshot);    // call a function with yield
        yield put(fetchDirectoriesSuccess(directoriesMap));     // dispatch using put
    } catch (error) {
        yield put(fetchDirectoriesFailure(error.message));
    }
}

function* onFetchDirectories() {
    yield takeLatest(directoryActionTypes.FETCH_DIRECTORY_START, fetchDirectories);
}

export default function* directorySagas() {
    yield all([
        call(onFetchDirectories),
    ]);
}