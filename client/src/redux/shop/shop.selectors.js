import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectIsFetchingCollections = createSelector(
    [selectShop],
    (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections      // converts any value to boolean
);

export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    (collections) => collections ? Object.keys(collections).map(key => collections[key]) : []   // Convert object to array for component to map over 
);

export const selectShopCollection = (collectionUrlParam) => createSelector(
    [selectShopCollections],
    (collections) => collections ? collections[collectionUrlParam] : null
);