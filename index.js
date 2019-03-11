/**
 * @description GET Decorator for treatments
 * @version v4
 * 
 * @api /api/v4/patients/{{patientId}}/treatments/{{treatmentId}}
 * @url /api/v3/patients/{{patientId}}/treatments/{{treatmentId}}
 */
const { send } = require('micro');
const fetch = require('node-fetch');
// const treatments_response = require('./example_treatments_list');

const DATETIME_RE = /([0-9\-]+T[0-9:]+)\.[0-9]{3}Z/;

const datetime_formatter_func = (datetime) => datetime ? datetime.match(DATETIME_RE)[1].replace('T', ' ') : datetime;

const decorate_treatment = (treatment) => {
    const new_treatment = {
        id: treatment.id,
        title: treatment.title,
        patient: treatment.patient,
        starred: treatment.starred,
        started: treatment.started,
        created: datetime_formatter_func('createdAt' in treatment ? treatment['createdAt'] : null),
        // prescribedBy: treatment.prescribedBy,
        prescriptions: 'prescriptions' in treatment ? treatment.prescriptions.map((prescription) => {
            const { interval, data, frequency } = prescription;
            const frequency_data = (prescription.type == 'appointment') ? {} : {
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
            if(!interval_data.repeats && !!interval_data.start && !!interval_data.end) {
                
            }

            const new_data = {
                ...data
            }
            if(data['type'] == 'homeVisit') { 
                new_data['type'] = 'home_visit'
            }
            if('date' in new_data){
                new_data['date'] = datetime_formatter_func(new_data['date']);
            }
            const new_prescription = {
                type: prescription.type,
                title: prescription.title,
                treatment: prescription.treatment,
                ...interval_data,
                frequency: frequency_data,
                data: new_data,
            };
            if('id' in prescription) { new_prescription['id'] = prescription.id; }
            if('createdAt' in prescription) { new_prescription['created'] = datetime_formatter_func('createdAt' in treatment ? treatment['createdAt'] : null); }
            if('notifications' in prescription) { new_prescription['notifications'] = prescription.notifications; }
            return new_prescription;
        }) : [],
    };

    return new_treatment;
};

const decorate_treatment_list_response = (response) => {
    const treatments = response['rows'] || [];
    return treatments.map((treatment) => decorate_treatment(treatment));
};

module.exports = async (req, res) => {
    const { authorization } = req.headers;

    const ONE = /api\/v[0-9]+\/patients\/[0-9\-a-zA-Z]+\/treatments\/[0-9\-a-zA-Z]+/;
    const LIST = /api\/v[0-9]+\/patients\/[0-9\-a-zA-Z]+\/treatments/;

    if(req.url.match(ONE) && req.method.toLowerCase() == 'get') {
        console.log("ONE");
        const path = req.url.replace('/v4', '/v3');
        const old_api = await fetch(`https://api.appotek.com:3001${path}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Authorization': authorization },
        })
        .then(res => res.json())
        const output = 'id' in old_api ? decorate_treatment(old_api) : old_api;
        return send(res, 200, output);
    }

    if(req.url.match(LIST) && req.method.toLowerCase() == 'get') {
        console.log("LIST");
        const path = req.url.replace('/v4', '/v3');
        const old_api = await fetch(`https://api.appotek.com:3001${path}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Authorization': authorization },
        })
        .then(res => res.json())
        const output = decorate_treatment_list_response(old_api);
        return send(res, 200, output);
    }

    return send(res, 404);
}
