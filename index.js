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

const decoratePrescription = (prescription) => {
    const interval = prescription.interval || {};
    if(!('start' in interval)){
        console.log(`







        ================================================================================================
        `,
        prescription,
        `----------------------------------------------------------------------------------------------`,
        JSON.stringify(prescription),
        `
        ================================================================================================








        `);
    }
    const data = prescription.data || {};
    const frequency = prescription.frequency || {};
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
    if('createdAt' in prescription) { new_prescription['created'] = datetime_formatter_func(prescription['createdAt']); }
    if('notifications' in prescription) { new_prescription['notifications'] = prescription.notifications; }
    return new_prescription;
};



const decorateTreatment = (treatment) => {
    const new_treatment = {
        id: treatment.id,
        title: treatment.title,
        patient: treatment.patient,
        starred: treatment.starred,
        started: treatment.started,
        created: datetime_formatter_func('createdAt' in treatment ? treatment['createdAt'] : null),
        // prescribedBy: treatment.prescribedBy,
        prescriptions: 'prescriptions' in treatment ? treatment.prescriptions.map((p) => decoratePrescription(p)) : [],
    };

    if('doctor' in treatment) {
        new_treatment['doctor'] = {
            "id": treatment.doctor.id,
            "first_name": treatment.doctor.firstName,
            "last_name": treatment.doctor.lastName,
            "photo": treatment.doctor.photo,
        };
    }
    return new_treatment;
};

const decorateTreatmentsList = (treatments) => {
    return treatments.map((treatment) => decorateTreatment(treatment));
};

const apiCall = async (path, authorization) => await fetch(`https://api.appotek.com:3001${path.replace('/v4', '/v3')}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Authorization': authorization },
})
.then(res => res.json())

module.exports = async (req, res) => {
    const { authorization } = req.headers;
    const PATIENT_LIST = /api\/v[0-9]+\/profile\/treatments/;

    const DOCTOR_ONE = /api\/v[0-9]+\/patients\/[0-9\-a-zA-Z]+\/treatments\/[0-9\-a-zA-Z]+/;
    const DOCTOR_LIST = /api\/v[0-9]+\/patients\/[0-9\-a-zA-Z]+\/treatments/;

    const DOCTOR_CREATE = /api\/v[0-9]+\/patients\/[0-9\-a-zA-Z]+\/treatment\/full/;

    if(req.url.match(PATIENT_LIST) && req.method.toLowerCase() == 'get') {
        console.log("PATIENT_LIST");
        old_api = await apiCall(req.url || '/', authorization);
        if(!('data' in old_api)) { return send(res, 500, old_api); }
        return send(res, 200, {
            ...old_api,
            data: {
                ...old_api.data,
                treatments: decorateTreatmentsList('treatments' in old_api.data ? old_api.data.treatments : [])
            },
        });
    }

    if(req.url.match(DOCTOR_ONE) && req.method.toLowerCase() == 'get') {
        console.log("DOCTOR_ONE");
        old_api = await apiCall(req.url || '/', authorization);
        if(!('id' in old_api)) { return send(res, 500, old_api); }
        return send(res, 200, decorateTreatment(old_api));
    }

    if(req.url.match(DOCTOR_LIST) && req.method.toLowerCase() == 'get') {
        console.log("DOCTOR_LIST");
        old_api = await apiCall(req.url || '/', authorization);
        if(!('rows' in old_api)) { return send(res, 500, old_api); }
        return send(res, 200, {
            ...old_api,
            rows: decorateTreatmentsList(old_api.rows),
        });
    }

    return send(res, 404);
}
