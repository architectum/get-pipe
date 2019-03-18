const jp = require('jsonpath');
module.exports = function(data) {
    return {
        "data": data.map((p, i) => {
            return {
                "id": p.id || null,
                "title": p.title || "",
                "folder": p.folder || null,
                "starred": p.starred || false,
                "started": p.started || false,
                "created": p.createdAt || null,
            };
        })
    };
}
