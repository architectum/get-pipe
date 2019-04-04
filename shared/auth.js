const _ = require('lodash');
const store = require('./store');
const { api } = require('./api');

const __treatment_builder = () => {
	const __treatment = {
		"title": "Treatment Created",
		"diagnosis": store().get('test.context.diagnosis').value(),
		"prescriptions": [{
			"title": "Treatment Text",
			"type": "text",
			"data": {
				"text": "Prescriptions Title"
			},
			"frequency": {
				"type": "daily",
				"days": [{
					"day": 1,
					"schedule": [{
						"time": "14:30"
					}]
				}]
			},
			"start": "2019-03-18T15:12:56Z",
			"end": "2019-04-18T15:12:56Z"
		}]
	};
	return __treatment;
};

const doctor_before_hook = async t => {
	let auth_headers = {};
	auth_headers = store().get('doctor.auth.headers').value();
	if(!(_.has(auth_headers, 'Authorization') && !!auth_headers['Authorization'])) {
		const {status, content} = await api( ['POST','/auth/login', 201], { body: {
			"appType":"doctor",
			"role":"doctor",
			"password": "1488",
			"login": "+380734202920",
			"deviceId": "I-ROBO-SNEK-I-DEVICE-SSSS1011"
		} } );
		store().update('auth.count', n => n + 1).write();
		t.is(status, 201);
		if(!_.has(content, 'data.profile.id') || !_.has(content, 'data.access')) {
			t.fail('Wrong response data');
			store().update('doctor.auth', () => ({
				'id': 0,
				'name': '',
				'headers': {'Content-Type': 'application/json'}
			})).write();
		} else {
			store().update('doctor.auth', () => ({
				'id': content.data.profile.id,
				'name': `${content.data.profile.firstName} ${content.data.profile.lastName}`,
				'headers': { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${content.data.access}`
				}
			})).write();
		}
		auth_headers = store().get('doctor.auth.headers').value();
	}
	t.truthy(auth_headers['Authorization'], 'Authorization NOT setup');
	store().update('test.context.diagnosis', (ctx) => "648869c2-306b-4631-bc71-a53bc2354dfc").write();
	store().update('test.context.patient', (ctx) => "f9cf6c43-baa9-4f42-a7bb-1d175771eeae").write();
};

const patient_before_hook = async t => {
	let auth_headers = {};
	auth_headers = store().get('patient.auth.headers').value();
	if(!(_.has(auth_headers, 'Authorization') && !!auth_headers['Authorization'])) {
		const {status, content} = await api( ['POST','/auth/login', 201], { body: {
			"appType":"patient",
			"role":"patient",
			"password": "1111",
			"login": "+380935722229",
			"deviceId": "36EF4293-6F3E-5FD0-B517-F2218808BF42"
		} } );
		store().update('auth.count', n => n + 1).write();
		t.is(status, 201);
		if(!_.has(content, 'data.profile.id') || !_.has(content, 'data.access')) {
			t.fail('Wrong response data');
			store().update('patient.auth', () => ({
				'id': 0,
				'name': '',
				'headers': {'Content-Type': 'application/json'}
			})).write();
		} else {
			store().update('doctor.auth', () => ({
				'id': content.data.profile.id,
				'name': `${content.data.profile.firstName} ${content.data.profile.lastName}`,
				'headers': { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${content.data.access}`
				}
			})).write();
		}
		auth_headers = store().get('doctor.auth.headers').value();
	}
	t.truthy(auth_headers['Authorization'], 'Authorization NOT setup');
	store().update('test.context.treatment', (ctx) => "8b542b6f-a1f3-4b62-ac42-6e0a8c224642").write();
	store().update('test.context.patient', (ctx) => "f9cf6c43-baa9-4f42-a7bb-1d175771eeae").write();
};

module.exports = {
    '__treatment_builder': __treatment_builder,
    'doctor_before_hook': doctor_before_hook,
    'patient_before_hook': patient_before_hook,
}
