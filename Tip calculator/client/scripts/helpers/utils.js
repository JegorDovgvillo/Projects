export const parseCurrentURL = () => {
    const urlParts = {};

    [urlParts.page] = location.hash.slice(2).split('/');

    return urlParts;
};
