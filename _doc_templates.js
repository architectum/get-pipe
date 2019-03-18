module.exports = function(data) {
    return {
        "id": data.id || null,
        "title": data.title || "",
        "folder": data.folder || null,
        "starred": data.starred || false,
        "started": data.started || false,
        "created": data.createdAt || null,
    };
};
