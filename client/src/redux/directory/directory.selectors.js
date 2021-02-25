import { createSelector } from "reselect";

const selectDirectory = (state) => state.directory;

export const selectDirectories = createSelector(
    [selectDirectory],
    (directory) => directory.directories
);

export const selectIsDirectoriesLoaded = createSelector(
    [selectDirectory],
    (directory) => !!directory.directories      // converts any value to boolean
);