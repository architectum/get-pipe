const {json} = require('micro');
const _ = require('lodash');
const api = require('../api');
const __prescriptions_taransformer__ = require('../wrap/prescription').input;

const _doc_post = require('../pipes/_doc_post');
const _doc_templates_get = require('../pipes/_doc_templates_get');
const _doc_templates = require('../pipes/_doc_templates');

module.exports = {
  'doctor.treatment.list': async (req, res, authorization) => {
    const input = {...req.params};
    if(!('patientId' in input)) {
      return [400, {
        'status': 'error',
        'message': 'patientId not provided',
        'data': {}
      }];
    };
    const {patientId} = req.params;
    // const alt_url = '/api/v3/profile/treatments';
    const {status, body} = await api.call(`/api/v3/patients/${patientId}/treatments`, authorization);
    if (![200, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    
    const getPrescription = async (patientId, treatmentId) => {
      const {status, body} = await api.call(`/api/v3/patients/${patientId}/treatments/${treatmentId}/prescriptions`, authorization);
      if (![200, 304, 301, 302, 204].includes(status)) {
        return [status, body];
      }
      const data = prescriptions.map((p) => __prescriptions_taransformer__(p));
      const output = {
        'status': 'ok',
        'message': 'success',
        'data': data
      };
      return [200, output];
    };
    const treatmentList = body.rows.map((row) => _.assign(row, {'patient': patientId }));
    const {data} = _doc_templates_get(treatmentList, false);
    const output = {
      'status': 'ok',
      'message': 'success',
      'data': data
    };
    return [200, output];
  },


  'doctor.treatment.one': async (req, res, authorization) => {
    const input = {...req.params};
    if(!('id' in input)) {
      return [400, {
        'status': 'error',
        'message': 'treatments_id not provided',
        'data': {}
      }];
    };
    if(!('patient' in input)) {
      return [400, {
        'status': 'error',
        'message': 'patientId not provided',
        'data': {}
      }];
    };
    const {id, patient} = req.params;
    const {status, body} = await api.get(`/api/v3/patients/${patient}/treatments/${id}`, authorization);
    if (![200, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const treatmentList = 'treatments' in body.data ? body.data.treatments : [];
    const treatment = treatmentList.find(t => t.id == req.params.id);
    const output = {
      'status': 'ok',
      'message': 'success',
      'data': _doc_templates(treatment, false)
    };
    return [200, output];
  },


  'doctor.treatment.new':  async (req, res, authorization) => {
    const input = {...req.params, ...await json(req)};
    if(!('patient' in input)) {
      return [400, {
        'status': 'error',
        'message': 'patientId not provided',
        'data': {}
      }];
    };
    const {prescriptions} = input;
    const prescriptions_v3 = prescriptions.map(p => __prescriptions_taransformer__(p));    
    const payload = JSON.stringify({...input, "prescriptions": prescriptions_v3});
    const {status, body} = await api.post(`/api/v3/patients/${input.patient}/treatment/full`, authorization, payload);
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


  'doctor.treatment.edit': async (req, res, authorization) => {
    const input = _doc_post(await json(req));
    const payload = JSON.stringify(input);
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


  'doctor.treatment.delete': async (req, res, authorization) => {
    const input = await json(req);
    if(!('id' in input)) {
      return [400, {
        'status': 'error',
        'message': 'id not provided',
        'data': {}
      }];
    }
    const payload = JSON.stringify({ id: input.id });
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
}
