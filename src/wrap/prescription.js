// const DATETIME_NEW_RE = /([0-9\-]+ [0-9:]+)\.[0-9]{3}/;
// const DATETIME_OLD_RE = /([0-9\-]+T[0-9:]+)\.[0-9]{3}Z/;
const datetime_formatter_func = (datetime) => !!datetime ? datetime : (new Date()).toJSON();

function output(prescription) {
    const interval = prescription.interval || {};
    const data = prescription.data || {};
    const frequency = prescription.frequency || {};
    const frequency_data = (prescription.type == 'appointment' || !('type' in frequency)) ? {} : {
        "type": frequency.type,
        "days": frequency.days.map((day_item) => {
            const times_arr = prescription.type == 'medicine' ? frequency.doses : frequency.time;
            return {
                "day": (prescription.type == 'medicine') ? day_item.day : day_item,
                "schedule": (prescription.type == 'medicine') ? day_item.doses : times_arr.map((time_item) => ({ "time": time_item }))
            }
        })
    };

    const interval_data = {
        "start": datetime_formatter_func('start' in interval ? interval['start'] : null),
        "end": datetime_formatter_func('end' in interval ? interval['end'] : null),
        "repeats": 'repeats' in interval ? interval['repeats'] : null
    };
    if(!interval_data['repeats']) {
        interval_data['repeats'] = frequency_data['days'].reduce((count, day) => count+day.schedule.length, 0)
    }
    // if (!interval_data.repeats && !!interval_data.start && !!interval_data.end) {

    // }

    const new_data = {
        ...data
    }
    if (data['type'] == 'homeVisit') {
        new_data['type'] = 'home_visit'
    }
    if ('date' in new_data) {
        new_data['date'] = datetime_formatter_func(new_data['date']);
    }
    const new_prescription = {
        title: prescription.title,
        treatment: prescription.treatment,
        prescribedBy: prescription.prescribedBy,
        type: prescription.type,
        data: new_data,
        ...interval_data,
        ...frequency_data,
        // data: new_data,
    };
    if ('id' in prescription) { new_prescription['id'] = prescription.id; }
    if ('createdAt' in prescription) { new_prescription['created'] = datetime_formatter_func(prescription['createdAt']); }
    if ('notifications' in prescription) { new_prescription['notifications'] = prescription.notifications; }
    return new_prescription;
};

function input(prescription) {
    const title = prescription.title || null;
    const type = prescription.type || null;
    const start = prescription.start || null;
    const end = prescription.end || null;
    const data = prescription.data || {};
    const id = ('id' in prescription) ? prescription['id'] : null;
    const notifications = ('notifications' in prescription) ? prescription['notifications'] : {}
    const frequency = ('frequency' in prescription) ? prescription['frequency'] : {}
    let wrappedFrequency = {};
    if(type != 'appointment' && !!frequency) {
        wrappedFrequency = {
            "type": frequency.type,
            "days": (type == 'medicine') 
                ? frequency.days.map((frq) => ({ "day": frq.day, "doses": frq.schedule })) 
                : frequency.days.map((frq) => frq.day),
            "time": frequency.days.reduce((res, frq) => res.concat(frq.schedule.map(s=>s.time)), []),
            "startDate": start,
            "stopAfterDate": end
        }
    }
    const wrapped = {
        "title": title,
        "type": type,
        "data": {
            ...data,
            "frequency": wrappedFrequency
        }
    }
    if(!!id) { wrapped["id"] = id; }
    if(!!notifications) { wrapped["notifications"] = notifications; }
    return wrapped;
}

module.exports = { input, output }
