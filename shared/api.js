process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const _ = require('lodash');
const fetch = require('node-fetch');
const API_V3 = process.env.API_V3 || 'https://api.appotek.com:3001';
const API_V4 = process.env.API_V4 || 'http://0.0.0.0:3000';
const store = require('./store');

const api_builder = (version = 'v4', app = 'doctor') => {
	const BASE_URL = version == 'v4' ? API_V4 : API_V3;
	return async ([method = 'GET', path = '/', status = false],  options = {}, rawResponse = false) => {
		const auth_headers = store().get(`${app}.auth.headers`).value() || { 'Content-Type': 'application/json' };
		const _headers = {
			...(auth_headers),
			...('headers' in options ? options['headers'] : {})
		}
		const _options = {
			...options,
			'method': options['method'] || method || 'GET',
			'headers': _headers,
		}

		if(!['GET', 'HEAD', "OPTIONS"].includes(_options['method'])) {
			_options['body'] = JSON.stringify(('body' in options) ? options['body'] : options);
		}
		const res = await fetch(`${BASE_URL}${path || '/'}`, _options);
		if(!!status && res.status != status) {
			throw new Error(`Status mismatch. Wait for "${status}", got "${res.status}"`);
		}
		return rawResponse ? res : { 
			'status': res.status,
			'content': await res.json(),
			'raw': res
		};
	};
}

module.exports = {
	'APIv3': API_V3,
	'APIv4': API_V4,
	'api_builder': api_builder,
	'api': api_builder(),
	'mobileapi': api_builder('v4', 'patient'),
	'api3': api_builder('v3'),
	'api4': api_builder('v4'),
};
