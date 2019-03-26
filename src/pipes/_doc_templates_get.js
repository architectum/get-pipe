const _doc_templates = require('./_doc_templates');

module.exports = function(data, is_templates) {
    return {
        "data": data.map((p) => _doc_templates(p, is_templates))
    };
}
