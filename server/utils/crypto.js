const CryptoJS = require('crypto-js');
const KEY = 'chatapp';

const ecr = function(obj) {
    return CryptoJS.AES.encrypt(JSON.stringify(obj), KEY);
};
const dcr = function(obj) {
    return JSON.parse(CryptoJS.AES.decrypt(obj, KEY).toString(CryptoJS.enc.Utf8));
};

const base64Encode = function(str) {
    var wordArray = CryptoJS.enc.Utf8.parse(str);
    return CryptoJS.enc.Base64.stringify(wordArray);
}
const base64Decode = function(base64) {
    var parsedWordArray = CryptoJS.enc.Base64.parse(base64);
    return parsedWordArray.toString(CryptoJS.enc.Utf8);
}
console.log('encrypted:', base64Encode("hello world"));
console.log("parsed:", base64Decode(base64Encode("hello world")));

module.exports = {
    ecr,
    dcr,
    base64Encode,
    base64Decode
}