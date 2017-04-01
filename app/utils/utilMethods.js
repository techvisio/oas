const crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var privateKey = '37LvDSm4XvjYOh9Y';

module.exports = (function () {
    return {
        isEmpty: isEmpty,
        encrypt: encrypt,
        decrypt: decrypt,
        getLeftPaddingData: getLeftPaddingData
    };

    function isEmpty(object) {
        if (object === '' || object === null || object === undefined) {
            return true;
        }
        return false;
    }
    // method to decrypt data(password)
    function decrypt(password) {
        var decipher = crypto.createDecipher(algorithm, privateKey);
        var dec = decipher.update(password, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }

    // method to encrypt data(password)
    function encrypt(password) {
        var cipher = crypto.createCipher(algorithm, privateKey);
        var crypted = cipher.update(password, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    function getLeftPaddingData(seq) {
        return String("00000" + seq).slice(-5);
    }

}())