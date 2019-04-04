const test =require('ava');
const _ = require('lodash');
const store = require('../../shared/store');
const { api } = require('../../shared/api');

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


test('<- [doctor]\t| treatment list\t\t| GET /api/v4/profile/treatments', async t => {
	const {content} = await api(['GET', '/api/v4/profile/treatments', 200]);
	t.is(content.status, 'ok', '"ok" expected in content.status');
	t.is(content.message, 'success', '"success" expected in content.message');
	t.true(_.has(content, 'data') && Array.isArray(content.data), '"data" must be an array in content');
	if(content.data.length > 0) {
		const treatment = content.data.shift();
		const treatmentFields = [
			'id', 
			'title', 
			'prescribedBy', 
			'started', 
			'created', 
			'updated',
			'prescriptions', 
        ];
		return t.true(treatmentFields.reduce((r,prop) => r && _.has(treatment, prop), true), `Required Template Fields is failed. // ${JSON.stringify(treatmentFields.reduce((result, prop) => _.assign(result, {[prop]: _.has(treatment, prop)}), {}))}`);
	}
});

test.skip('-> [doctor]\t| treatment create\t\t| POST /api/v4/profile/treatments', async t => {
    const patient_id = store().get('test.context.patient').value();
    t.truthy(patient_id, 'Cannot resolve {patient_id}');
    if(!patient_id) return;
    const treatment = __treatment_builder();
	const {content} = await api(['POST', `/api/v4/patients/${patient_id}/treatments/full`, 201], { body: treatment });
	t.is(content.status, 'ok', '"ok" expected in content.status');
	t.is(content.message, 'success', '"success" expected in content.message');
	t.true(_.has(content, 'data.id'), '"data" must be an instance of treatment');
	store().update('test.context.treatment', (ctx) => content.data.id).write();
});

test.skip('<- [doctor]\t| treatment details\t\t| GET /api/v4/profile/treatments/:id ', async t => {
    const patient_id = store().get('test.context.patient').value();
    const treatment_id = store().get('test.context.treatment').value();
    t.truthy(patient_id, 'Cannot resolve {patient_id}');
    t.truthy(treatment_id, 'Cannot resolve {treatment_id}');
    if(!patient_id) return;
    if(!treatment_id) return;
    // -----------------------------
	const {content} = await api(['GET', `/api/v3/patients/${patient_id}/treatments/${treatment_id}`, 200]);
	t.is(content.status, 'ok', '"ok" expected in content.status');
	t.is(content.message, 'success', '"success" expected in content.message');
	t.true(_.has(content, 'data.id'), '"data" must be an instance of treatment');
});

test.skip('-> [doctor]\t| treatment edit\t\t| PUT /api/v4/profile/treatments/:id', async t => {
	const treatment_id = store().get('test.context.treatment').value();
	t.truthy(treatment_id, 'Cannot resolve {treatment_id}');
    if(!treatment_id) return;
	const new_title = "Treatment Edited";
	const treatment = { "title": new_title };
	const {content} = await api(['PUT', `/api/v4/profile/treatments/${treatment_id}`, 200], { body: treatment });
	t.is(content.status, 'ok', '"ok" expected in $response.status');
	t.is(content.message, 'success', '"success" expected in $response.message');
	t.true(_.has(content, 'data.id'), '"data" must be an instance of treatment');
	const $response_check = await api(['GET', `/api/v4/profile/treatments/${treatment_id}`, 200]);
	t.true(_.has($response_check, 'content.data.id'), 'Cannot get content.data.id on $response_check');
	t.is($response_check.content.data.title, new_title, 'Title is NOT updated!');
});

test.skip('-x [doctor]\t| treatment delete\t\t| DELETE /api/v4/profile/treatments/:id', async t => {
	const treatment_id = store().get('test.context.treatment').value();
	t.truthy(treatment_id, 'Cannot resolve {treatment_id}');
    if(!treatment_id) return;
	const {content} = await api(['DELETE', `/api/v4/profile/treatments/${treatment_id}`, 200], { body: { id: treatment_id} });
	t.is(content.status, 'ok', '"ok" expected in $response.status');
	t.is(content.message, 'success', '"success" expected in $response.message');
});

