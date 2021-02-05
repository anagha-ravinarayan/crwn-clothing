import { takeLatest, call, put } from "redux-saga/effects";

import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";

import { ShopActionTypes } from "./shop.types";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "./shop.actions";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();         // native firestore method to fetch snapshot
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);    // call a function with yield
        yield put(fetchCollectionsSuccess(collectionsMap));     // dispatch using put
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollections() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}