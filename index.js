/**
 * @description GET Decorator for treatments
 * @version v4
 * 
 * @api /api/v4/patients/{{patientId}}/treatments/{{treatmentId}}
 * @url /api/v3/patients/{{patientId}}/treatments/{{treatmentId}}
 */
const { send, json } = require('micro');
const fetch = require('node-fetch');
// const treatments_response = require('./example_treatments_list');
const transform_in = require('./_doc_post');
const _doc_templates_get = require('./_doc_templates_get');

const API_HOST = process.env.API_HOST || "https://api.appotek.com:3001";
const DATETIME_RE = /([0-9\-]+T[0-9:]+)\.[0-9]{3}Z/;

const datetime_formatter_func = (datetime) => datetime ? datetime.match(DATETIME_RE)[1].replace('T', ' ') : datetime;

const decoratePrescription = (prescription) => {
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
    if (!interval_data.repeats && !!interval_data.start && !!interval_data.end) {

    }

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
        type: prescription.type,
        data: new_data,
        ...interval_data,
        treatment: prescription.treatment,
        data: new_data,
    };
    if ('id' in prescription) { new_prescription['id'] = prescription.id; }
    if ('createdAt' in prescription) { new_prescription['created'] = datetime_formatter_func(prescription['createdAt']); }
    if ('notifications' in prescription) { new_prescription['notifications'] = prescription.notifications; }
    return new_prescription;
};


const decorateTreatmentPrepareToPost = (_data) => {
    const _title = _data.title || null;
    const _prescriptions = _data.prescriptions || null;
    if (!_title || !_prescriptions) {
        throw new Error('Invalid input. Required: [title, prescriptions]');
    }
    const _id = ('id' in _data) ? _data['id'] : null;

    const old_prescriptions = prescriptions.map((prescription) => {
        const title = prescription.title;
        const TYPE = prescription.type;
        const start = prescription.start;
        const end = prescription.end;
        const data = prescription.data || {};

        const id = ('id' in prescription) ? prescription['id'] : null;
        const notifications = ('notifications' in prescription) ? prescription['notifications'] : {}
        const frequency = ('frequency' in prescription) ? prescription['frequency'] : {}

        let old_freq = {};
        if(TYPE != 'appointment' && !!frequency) {
            old_freq = {
                "type": frequency.type,
                "days": (TYPE == 'medicine') 
                    ? frequency.days.map((frq) => ({ "day": frq.day, "doses": frq.schedule })) 
                    : frequency.days.map((frq) => frq.day),
                "time": frequency.days.reduce((res, frq) => res.concat(frq.schedule.map(s=>s.time)), []),
                "startDate": start,
                "stopAfterDate": end
            }
        }
        

        const old_prescription = {
            "title": title,
            "type": TYPE,
            "data": {
                ...data,
                "frequency": old_freq
            }
        }

        if(!!id) { old_prescription["id"] = id; }
        if(!!notifications) { old_prescription["notifications"] = notifications; }

        return old_prescription;

    })

    const old_treatment = {
        "title": _title,
        "prescriptions": old_prescriptions
    };
    if(!!_id) { old_treatment["id"] = _id; }
    return old_treatment;
};

const decorateTreatment = (treatment, is_doctor = false) => {
    const new_treatment = {
        id: treatment.id,
        title: treatment.title,
        patient: treatment.patient,
        star: treatment.starred,
        started: treatment.started,
        created: datetime_formatter_func('createdAt' in treatment ? treatment['createdAt'] : null),
    };
    if (!is_doctor) {
        if ('doctor' in treatment) {
            new_treatment['doctor'] = {
                "id": treatment.doctor.id,
                "first_name": treatment.doctor.firstName,
                "last_name": treatment.doctor.lastName,
                "photo": treatment.doctor.photo,
            };
        }
    }

    if ('prescriptions' in treatment) {
        new_treatment['prescriptions'] = treatment.prescriptions.map((p) => decoratePrescription(p));
    }

    return new_treatment;
};

const decorateTreatmentsList = (treatments, is_doctor = false) => {
    return treatments.map((treatment) => decorateTreatment(treatment, is_doctor));
};

const apiCall = async (path, authorization, method = 'get', payload = false) => {
    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': authorization },
    };
    if(method !== 'get' && method !== 'head' && !!payload) {
        options.body = payload;
    }
    return await fetch(`${API_HOST}${path.replace('/v4', '/v3')}`, options).then(res => res.json());
}
    

module.exports = async (req, res) => {
    // return send(res, 200, {body: req.body });

    const METHOD = req.method.toLowerCase();
    const { authorization } = req.headers;

    const PATIENT_LIST = /api\/v4\/profile\/treatments/;
    const PATIENT_CREATE = /api\/v4\/patients\/[0-9\-a-zA-Z]+\/treatment\/full/;

    const DOCTOR_ONE = /api\/v4\/patients\/[0-9\-a-zA-Z]+\/treatments\/[0-9\-a-zA-Z]+/;
    const DOCTOR_LIST = /api\/v4\/patients\/[0-9\-a-zA-Z]+\/treatments/;

    const DOCTOR_CREATE = /api\/v4\/profile\/treatments/;
    const DOCTOR_GET_TEMPLATES = /api\/v4\/profile\/templates/;
    const DOCTOR_CREATE2 = /api\/v4\/profile\/template/;

    if (METHOD == 'post') {
        if (req.url.match(PATIENT_CREATE)) {
            console.log("PATIENT_CREATE");
            const body = await json(req);

            // const textBody = await json(req);
            // console.log(textBody);
            // const { title, prescriptions } = await json(req);
            // console.log(title, prescriptions);
            // const payload = {
            //     "title": title,
            //     "prescriptions": prescriptions.map(p => decoratePrescription(p))
            // };
            // const result = decorateTreatmentPrepareToPost(payload)
            const payload = transform_in(body);
            console.log(JSON.stringify(payload));
            return await apiCall(req.url || '/', authorization, 'post', JSON.stringify(payload));
            // if(!('code' in result) && result.code != 200) { return send(res, result.code, result); }
            // return send(res, 201, result);
        }

        if (req.url.match(DOCTOR_CREATE) || req.url.match(DOCTOR_CREATE2)) {
            console.log("DOCTOR_CREATE");
            const body = await json(req);

            // const payload = {
            //     "title": title,
            //     "prescriptions": prescriptions.map(p => decoratePrescription(p))
            // };
            // const result = decorateTreatmentPrepareToPost(payload)
            const payload = transform_in(body);
            console.log(JSON.stringify(payload));
            return await apiCall(req.url || '/', authorization, 'post', JSON.stringify(payload));
            // if(!('code' in result) && result.code != 200) { return send(res, result.code, result); }
            // return send(res, 201, result);
        }
        // transform_in

        return send(res, 404);
    }

    if (METHOD == 'get') {

        if (req.url.match(DOCTOR_GET_TEMPLATES)) {
            console.log("DOCTOR_GET_TEMPLATES");
            old_api = await apiCall(req.url || '/', authorization);
            if (!('data' in old_api)) { return send(res, 500, old_api); }
            return send(res, 200, _doc_templates_get(old_api.data));
        }

        if (req.url.match(PATIENT_LIST)) {
            console.log("PATIENT_LIST");
            old_api = await apiCall(req.url || '/', authorization);
            if (!('data' in old_api)) { return send(res, 500, old_api); }
            return send(res, 200, {
                ...old_api,
                data: {
                    ...old_api.data,
                    treatments: decorateTreatmentsList('treatments' in old_api.data ? old_api.data.treatments : [])
                },
            });
        }

        if (req.url.match(DOCTOR_ONE) && METHOD == 'get') {
            console.log("DOCTOR_ONE");
            old_api = await apiCall(req.url || '/', authorization);
            if (!('id' in old_api)) { return send(res, 500, old_api); }
            return send(res, 200, decorateTreatment(old_api));
        }

        if (req.url.match(DOCTOR_LIST) && METHOD == 'get') {
            console.log("DOCTOR_LIST");
            old_api = await apiCall(req.url || '/', authorization);
            if (!('rows' in old_api)) { return send(res, 500, old_api); }
            return send(res, 200, {
                ...old_api,
                rows: decorateTreatmentsList(old_api.rows, true),
            });
        }
    }

    return send(res, 404);
}
