import { ShopActionTypes } from "./shop.types";

import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_START,
    }
}

export const fetchCollectionsSuccess = (collectionsMap) => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collectionsMap
    }
}

export const fetchCollectionsFailure = (errorMessage) => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: errorMessage
    }
}

// Returns a function instead of an object - hence gets caught by thunk middleware
export const fetchCollectionsAsync = () => {
    const fetchCollections = (dispatch) => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.onSnapshot(async (snapshot) => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }, (error) => dispatch(fetchCollectionsFailure(error.message)));
    }
    return fetchCollections;
}