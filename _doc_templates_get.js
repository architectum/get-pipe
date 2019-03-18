const _doc_templates = require('./_doc_templates');
module.exports = function(data) {
    return {
        "data": data.map((p) => _doc_templates(p))
    };
}
