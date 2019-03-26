const _ = require('lodash');
const wrap_treatment = require('../wrap/treatment');
const wrap_prescription = require('../wrap/prescription');


const __get_template_body = (data) => {
    data['owner'] = data['prescribedBy'];
    // delete data['prescriptions'];
    delete data['prescribedBy'];
    delete data['started'];
    return {
        "folder": data.folder || null,
        "owner": data.owner || null,
        "starred": data.starred || false,
        ...data,
    }
};

const __get_treatment_body = (data) => {
    // data['prescribedBy'] = data['owner'];
    delete data['starred'];
    delete data['folder'];
    delete data['owner'];
    return {
        "prescribedBy": data.prescribedBy || null,
        "started": data.started || false,
        ...data,
    }
};


function __treatment_basic_wrap_api2user(input, is_template) {
    const render = !!is_template ? __get_template_body : __get_treatment_body

    const data = {...input};
    delete data['version'];
    delete data['createdAt'];
    delete data['updatedAt'];
    delete data['deletedAt'];

    return {
        "id":      input['id'],
        "title":   input['title'],
        ...render(data),    
        "prescriptions": (data.prescriptions || []).map(p => wrap_prescription.output(p)),
        "created":  input['createdAt'],
        "updated":  input['updatedAt']
    };
}



module.exports = function(data, is_template) {
    const treatment = __treatment_basic_wrap_api2user(data, is_template);
    const hash = (_o) => Object.keys(_o).map(i=>i[0]).join('')

    console.log(`=== IN >>> \t{~ ${hash(data)} ~}\t >>> |\t_doc_templates.js\t| >>> \t{~ ${hash(treatment)} ~}\t >>> OUT`)
    return treatment;
};




