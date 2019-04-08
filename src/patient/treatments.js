const {json} = require('micro');
const _ = require('lodash');
const ajv = require('ajv')({ allErrors: true, $data: true });
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

const api = require('../api');
const __prescriptions_taransformer__ = require('../wrap/prescription').input;

const _doc_post = require('../pipes/_doc_post');
const _doc_templates_get = require('../pipes/_doc_templates_get');
const _doc_templates = require('../pipes/_doc_templates');

const __treatment_builder_json__ = {
  "title": "string",
  "diagnosis": "any",
  "prescriptions": {
      "title": "string",
      "type": "string",
      "data": {
          "text": "string",
      },
      "frequency": {
          "type": "string",
          "days": {
              "day": "number",
              "schedule": {
                  "time": "string",
              }
          }
      },
      "start": "string",
      "end": "string"
  }
};

// tv4.validate(data, schema, function (isValid, validationError) { ... });

const prescription_json_schema = {
  "title": "string",
  "type": "string",
  "data": { "text": "string" },
  "frequency": {
    "type": "string",
    "days": [
      {
        "day": "number",
        "schedule": [
          { "time": "number" }
        ]
      }
    ]
  },
  "start": "data-time",
  "end": "data-time"
}

const treatment_json_schema = {
  "title": "string",
  "prescriptions": { $ref: prescription_json_schema }
};



module.exports = {
  'patient.treatment.new': async (req, res, authorization) => {
    const input = {...await json(req), ...req.params};
    const patient_treatments_schema = require('../../__validators__/patient/treatments/scheme.json');
    if(!tv4.validate(input, patient_treatments_schema)) {
        return [422, {
            'status': 'error',
            'message': 'validation_error',
            'data': tv4.error
        }];
    }
    
    const {prescriptions} = input;
    prescriptions.map(prescription => {

        if(!('title' in prescription)) throw new Error('500@{{title}} not defined');
        if(!('type' in prescription)) throw new Error('500@{{type}} not defined');
    });
    const prescriptions_v3 = prescriptions.map(p => __prescriptions_taransformer__(p));
    const payload = JSON.stringify({...input, "prescriptions": prescriptions_v3});
    return [201, payload];
    const {status, body} = await api.post(req.url || '/', authorization, payload);
    if (![200, 201, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const data = _doc_templates(body.data, false);
    const output = {
      'status': 'ok',
      'message': 'success',
      'data': {
        'id': data['id']
      }
    };
    return [201, output];
  },

  'patient.treatment.list': async (req, res, authorization) => {
    const {status, body} = await api.call(req.url || '/', authorization);
    if (![200, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const output = {
      'status': 'ok',
      'message': 'success',
      ..._doc_templates_get(body.data.treatments, false)
      // 'data': treatments.List(body.rows, true)
    };
    return [200, output];
  },

  'patient.treatment.one': async (req, res, authorization) => {
    const {status, body} = await api.call(req.url || '/', authorization);
    if (![200, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const output = {
      'status': 'ok',
      'message': 'success',
      'data': _doc_templates(body.data, false)
      // 'data': treatments.List(body.rows, true)
    };
    return [200, output];
  },
}
