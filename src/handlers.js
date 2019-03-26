const {json} = require('micro');
const api = require('./api');

const _doc_post = require('./pipes/_doc_post');
const _doc_templates_get = require('./pipes/_doc_templates_get');
const _doc_templates = require('./pipes/_doc_templates');

module.exports = {
  'patient.treatment.list': async (req, res, authorization) => {
    console.log('patient.treatment.list');
    const {status, body} = await api.call(req.url || '/', authorization);
    if (![200, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const treatmentList = 'treatments' in body.data ? body.data.treatments : [];
    const output = {
      'status': 'ok',
      'message': 'success',
      ..._doc_templates_get(treatmentList, false)
    };
    return [200, output];
  },

  'patient.treatment.new': async (req, res, authorization) => {
    const payload = JSON.stringify(_doc_post(await json(req)));
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

  'doctor.template.new': async (req, res, authorization) => {
    const payload = JSON.stringify(_doc_post(await json(req)));
    const {status, body} = await api.post('/api/v4/profile/template', authorization, payload);
    if (![200, 201, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const data = _doc_templates(body.data, true);
    const output = {
      'status': 'ok',
      'message': 'success',
      'data': {
        'id': data['id']
      }
    };
    return [201, output];
  },
 
  'doctor.template.edit': async (req, res, authorization) => {
    console.log('DOCTOR_EDIT');
    if(!('id' in req.params)) {
      return [500, {'message': '{{templateId}} not defined'}];
    }
    const data = await json(req);
    data['id'] = req.params['id'];
    const payload = JSON.stringify(_doc_post(data));
    const {status, body} = await api.patch(req.url || '/', authorization, payload);
    if (![200, 201, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const result = _doc_templates(body.data, true);
    const output = {
      'status': 'ok',
      'message': 'success',
      'data':{
        'id': result['id']
      }
    };
    return [200, output];
  },

  'doctor.treatment.new': async (req, res, authorization) => {
    console.log('DOCTOR_CREATE');
    const payload = JSON.stringify(_doc_post(await json(req)));
    console.log(payload); 
    const {status, body} = await api.post('/api/v4/profile/template', authorization, payload);
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
    return [200, output];
  },

  'doctor.template.one': async (req, res, authorization) => {
    console.log('doctor.template.one');
    const {status, body} = await api.call(req.url || '/', authorization);
    if (![200, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const output = {
      'status': 'ok',
      'message': 'success',
      'data': _doc_templates(body.data.template, true)
    };
    return [200, output];
  },

  'doctor.treatment.list': async (req, res, authorization) => {
    console.log('doctor.treatment.list');
    const {status, body} = await api.call(req.url || '/', authorization);
    if (![200, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const output = {
      'status': 'ok',
      'message': 'success',
      'data': _doc_templates_get(body.rows, false)
      // 'data': treatments.List(body.rows, true)
    };
    return [200, output];
  },

  'doctor.template.list': async (req, res, authorization) => {
    console.log('doctor.template.list');
    const {status, body} = await api.call(req.url || '/', authorization);
    if (![200, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const output = {
      'status': 'ok',
      'message': 'success',
      ..._doc_templates_get(body.data, true)
    };
    return [200, output];
  },

}