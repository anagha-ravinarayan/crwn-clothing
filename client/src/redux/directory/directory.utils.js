export const addPropertiesToDirectories = (directories) => {
    return directories.map((directory, idx) =>
        idx === directories.length - 1 || idx === directories.length - 2
            ? { ...directory, size: 'large' }
            : directory
    );
}