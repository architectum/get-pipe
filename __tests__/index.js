import test from 'ava';
import _ from 'lodash';
import fetch from 'node-fetch';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const API_V3 = 'https://api.appotek.com:3001';
const API_V4 = 'http://0.0.0.0:3000';

const db = low(new FileSync('__tests__/.db'))
db.defaults({
    auth: {
        doctor: {
            id: 0,
            name: '',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        count: 0
    }
}).write();

const doctorHeaders = async t => {
	const headers = db.get('auth.doctor.headers').value();
	if('Authorization' in headers) {
		t.truthy(headers['Authorization'], 'Authorization header unresolved');
	} else {
		const credentials = {
			"appType":"doctor",
			"role":"doctor",
			"password": "1488",
			"login": "+380734202920",
			"deviceId": "I-ROBO-SNEK-I-DEVICE-SSSS1011"
		};		
		const res = await fetch(`${API_V3}/auth/login`, {
			'method': 'POST',
			'headers': { ...headers },
			'body': JSON.stringify(credentials)
		});
		t.is(res.status, 201);
		const body = await res.json();
		t.truthy(body.data, 'Empty response data');
		const {profile, access} = body.data;
		t.truthy(access, 'Token is not resolved');
		headers['Authorization'] = `Bearer ${access}`;
		db.get('auth').update('doctor', () => ({
			'id': profile.id,
			'name': `${profile.firstName} ${profile.lastName}`,
			'headers': headers
		})).write();
		db.update('auth.count', n => n + 1).write();
	}
	return headers;
};


async function doctorRequest(t, method = 'GET', path = '', status = false,  options = {}, parseResponse = true) {
	const headers = await doctorHeaders(t);
	// console.warn(`:: => ${method} ${path}`);
    const res = await fetch(`${API_V4}${path}`, {
        'method': method,
		'headers': headers,
		...options
	});
	if(!!status) {
		t.is(res.status, status);
	}
	return parseResponse ? await res.json() : {};
}

// test('GET / -> 404', async t => {
//     const $response = await doctorRequest(t, 'GET', '/', 404);
// 	t.is($response.message, 'Not found', '"Not found" expected in $response.message');
// });

// test('PUT / -> 204', async t => {
//     await doctorRequest(t, 'PUT', '/?debug=1', 204, {}, false);
// 	// t.is($response.message, 'Not implemented', '"Not implemented" expected in $response.message');
// 	// console.log($response.stack);
// });

test('<- template list\t| GET /api/v4/profile/templates', async t => {
	const $response = await doctorRequest(t, 'GET', '/api/v4/profile/templates', 200);
	const {status, message, data} = $response;
	t.is(status, 'ok', '"ok" expected in $response.status');
	t.is(message, 'success', '"success" expected in $response.message');
	t.true(Array.isArray(data), '"data" must be an array in $response');
	if(data.length > 0) {
		const template = data.shift();
		const templateFields = [
			'id', 
			'title', 
			'folder', 
			'owner', 
			'starred', 
			'created', 
			'updated'
		];
		t.true(templateFields.reduce((r,prop) => r && _.has(template, prop), true), `Required Template Fields is failed. // ${JSON.stringify(templateFields.reduce((result, prop) => _.assign(result, {[prop]: _.has(template, prop)}), {}))}`);
	}
});

let temp_template_id = null;

test('-> template create\t| POST /api/v4/profile/templates', async t => {
	const template = {
		"prescriptions": [{
			"data": {
				"text": "ff"
			},
			"frequency": {
				"days": [{
					"day": 1,
					"schedule": [{
						"time": "00:30"
					}]
				}],
				"type": "daily"
			},
			"start": "2019-03-18T15:12:56Z",
			"end": "2019-04-18T15:12:56Z",
			"title": "Treatment Text",
			"type": "text"
		}],
		"diagnosis": "648869c2-306b-4631-bc71-a53bc2354dfc",
		"title": "Treatment Created"
	};
	const $response = await doctorRequest(t, 'POST', `/api/v4/profile/templates`, 201, { body: JSON.stringify(template) });
	const {status, message, data} = $response;
	t.is(status, 'ok', '"ok" expected in $response.status');
	t.is(message, 'success', '"success" expected in $response.message');
	t.true(_.has(data, 'id'), '"data" must be an instance of template');
	temp_template_id = data['id'];
});

test('<- template details\t| GET /api/v4/profile/templates/{{templateId}} ', async t => {
	const template_id = temp_template_id;
	const $response = await doctorRequest(t, 'GET', `/api/v4/profile/templates/${template_id}`, 200);
	const {status, message, data} = $response;
	t.is(status, 'ok', '"ok" expected in $response.status');
	t.is(message, 'success', '"success" expected in $response.message');
	t.true(_.has(data, 'id'), '"data" must be an instance of template');
	const template = data;
	const templateFields = [
		'id', 
		'title', 
		'folder', 
		'owner', 
		'starred', 
		'created', 
		'updated',
		'prescriptions'
	];
	t.true(templateFields.reduce((r,prop) => r && _.has(template, prop), true), `Required Template Fields is failed. // ${JSON.stringify(templateFields.reduce((result, prop) => _.assign(result, {[prop]: _.has(template, prop)}), {}))}`);
});

test('-> template edit\t| PUT /api/v4/profile/templates/{{templateId}}', async t => {
	const template_id = temp_template_id;
	const new_title = "Treatment Edited";
	const template = {
		"title": new_title,
	};
	const $response = await doctorRequest(t, 'PUT', `/api/v4/profile/templates/${template_id}`, 200, { body: JSON.stringify(template) });
	const {status, message, data} = $response;
	t.is(status, 'ok', '"ok" expected in $response.status');
	t.is(message, 'success', '"success" expected in $response.message');
	t.true(_.has(data, 'id'), '"data" must be an instance of template');
	const $response_check = await doctorRequest(t, 'GET', `/api/v4/profile/templates/${template_id}`, 200);
	t.true(_.has($response_check, 'data.id'), 'Cannot get data.id on $response');
	t.is($response_check['data']['title'], new_title, 'Title is NOT updated!');
});


test('-x template delete\t| DELETE /api/v4/profile/templates/{{templateId}}', async t => {
	const template_id = temp_template_id;
	const $response = await doctorRequest(t, 'DELETE', `/api/v4/profile/templates/${template_id}`, 200, { body: JSON.stringify({ id: template_id}) });
	const {status, message, data} = $response;
	t.is(status, 'ok', '"ok" expected in $response.status');
	t.is(message, 'success', '"success" expected in $response.message');
	// t.true(_.has(data, 'id'), '"data" must be an instance of template');
	// const $response_check = await doctorRequest(t, 'GET', `/api/v4/profile/templates/${template_id}`, 200);
	// t.true(_.has($response_check, 'data.id'), 'Cannot get data.id on $response');
	// t.is($response_check['data']['title'], new_title, 'Title is NOT updated!');
});


// POST https://api.appotek.com/api/v3/patients - get пациентов для доктора

// потрібні ендпоінти :     
// test.todo(`GET("/api/v3/profile/templates") - get ліст темплейтів`);
// test.todo(`GET ("/api/v3/profile/templates/{templateId}/") - get темплейт детаілс`);
// test.todo(`-> template create\t| POST /api/v4/profile/templates`);
// test.todo(`-> template edit\t| POST /country/api/treatment/edit`);