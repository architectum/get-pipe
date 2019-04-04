const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const DB_FILENAME = 'shared/$.db.json';


const __common_fields = {
    "auth": {
        "id": 0,
        "name": '',
        "headers": {
            'Content-Type': 'application/json'
        },
        "count": 0
    },
    "test": {
        "context": {
            "diagnosis": '',
            "template": '',
            "patient": '',
        }
    }
};

const DB_DEFAULTS = {
    "doctor": {
        ...__common_fields
    },
    "patient": {
        ...__common_fields
    },
};

module.exports = () => {
    const db = low(new FileSync(DB_FILENAME))
    db.defaults(DB_DEFAULTS).write();
    return db;
}
