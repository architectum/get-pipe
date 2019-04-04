const {json} = require('micro');
const _ = require('lodash');
const api = require('../api');
const __prescriptions_taransformer__ = require('../wrap/prescription').input;

const _doc_post = require('../pipes/_doc_post');
const _doc_templates_get = require('../pipes/_doc_templates_get');
const _doc_templates = require('../pipes/_doc_templates');

module.exports = {
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

  'doctor.template.new': async (req, res, authorization) => {
    const input = {...await json(req), ...req.params};
    // if(!('id' in req.params)) {
    //     return [500, {'message': '{{templateId}} not defined'}];
    //   }
    const payload = JSON.stringify(_doc_post(input));
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

  'doctor.template.delete': async (req, res, authorization) => {
    if(!('id' in req.params)) {
      return [500, {'message': '{{templateId}} not defined'}];
    }
    const data = await json(req);
    data['id'] = req.params['id'];
    const {status, body} = await api.delete(req.url || '/', authorization);
    if (![200, 201, 304, 301, 302, 204].includes(status)) {
      return [status, body];
    }
    const output = {
      'status': 'ok',
      'message': 'success',
      'data': { }
    };
    return [200, output];
  }
}
