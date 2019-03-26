const DATETIME_NEW_RE = /([0-9\-]+ [0-9:]+)\.[0-9]{3}/;
const DATETIME_OLD_RE = /([0-9\-]+T[0-9:]+)\.[0-9]{3}Z/;
const datetime_formatter_func = (datetime, isNew = true) => !!datetime ? datetime.match(isNew ? DATETIME_NEW_RE : DATETIME_OLD_RE)[1].replace(isNew ? 'T' : '', isNew ? ' ' : 'T') : datetime;

const prescriptions = require('./prescription');

const wrapInput = (_data) => {
    const _id = ('id' in _data) ? _data['id'] : null;
    const _title = _data.title || null;
    const _prescriptions = _data.prescriptions || null;
    if (!_title || !_prescriptions) {
        throw new Error('Invalid input. Required: [title, prescriptions]');
    }

    const old_prescriptions = prescriptions.map((p) => prescription.input(p))

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

module.exports = {
    'Get': decorateTreatment,
    'List': decorateTreatmentsList,
    'Post': wrapInput,
}