const jp = require('jsonpath');
module.exports = function(data) {
    const {title, saveAsTemplate, prescriptions} = data;
    const frequencies = prescriptions.map(p => jp.query(p, '$.frequency.type')[0])
        .map(type => type ? jp.query(prescriptions, '$[*].frequency')[0] : null)
        .map((freq) => freq ? {"type": freq.type, "days": jp.query(freq, '$.days[*].day'), "time": jp.query(freq, '$.days[*].schedule[*].time')} : null);
    return {
        "title": title,
        "saveAsTemplate": saveAsTemplate || false,
        "prescriptions": prescriptions.map((p, i) => {
            return {
                "title": p.title || null,
                "type": p.type || null,
                "data": p.data || {},
                "notifications": p.notifications || {},
                "frequency": (i in frequencies && !!frequencies[i]) ? frequencies[i] : {"type": "daily", "days": [], "time": []},
                "interval": {
                    "start": p.start || null,
                    "end": p.end || null
                }
            };
        })
    };
}
