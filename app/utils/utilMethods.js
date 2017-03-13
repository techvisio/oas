module.exports = (function () {
    return {
        isEmpty: isEmpty
    };

    function isEmpty(object) {
        if (object === '' || object === null || object === undefined) {
            return true;
        }
        return false;
    }
}())