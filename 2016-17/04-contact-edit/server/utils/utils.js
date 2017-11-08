function _existsId(haystack, needleName, needleValue) {
    let out = haystack.find(obj => obj[needleName] === needleValue);
    return out;
}

function _serverLog(text, req) {
    console.log(
        `${req.method} ${text}, ` +
        `query: ${JSON.stringify(req.query)}, ` +
        `params: ${JSON.stringify(req.params)}, ` +
        `body: ${JSON.stringify(req.body)}`
    );
}

function _findBy(arr, indexName, val) {
    let index = arr.map(item => item[indexName]).indexOf(val);
    return index;
}

function _removeBy(arr, indexName, val) {
    let removeIndex = _findBy(arr, indexName, val);
    ~removeIndex && arr.splice(removeIndex, 1);
}

function _update(oldItem, newItem) {
    oldItem = Object.assign(oldItem, newItem);
}

exports.existsId = _existsId;
exports.serverLog = _serverLog;
exports.findBy = _findBy;
exports.removeBy = _removeBy;
exports.update = _update;
