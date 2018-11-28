var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};
var isAlphanumeric = (str) => {
    return /^[a-zA-Z0-9\- ]*$/g.test(str);
};

module.exports = {
    isRealString,
    isAlphanumeric
};