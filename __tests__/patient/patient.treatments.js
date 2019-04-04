const test = require('ava');
const tv4 = require('tv4');
const _ = require('lodash');
const store = require('../../shared/store');
const { mobileapi } = require('../../shared/api');

const __treatment_builder = () => {
	const __treatment = {
		"title": "Treatment Created",
		"diagnosis": store().get('patient.test.context.diagnosis').value(),
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

test.skip('<- [patient] GET /api/v4/profile/treatments', async t => {
	const {content} = await mobileapi(['GET', '/api/v4/profile/treatments', 200]);
	t.is(content.status, 'ok', '"ok" expected in content.status');
	t.is(content.message, 'success', '"success" expected in content.message');
	t.true(_.has(content, 'data') && Array.isArray(content.data), '"data" must be an array in content');
});

test.skip('-> [patient] POST /api/v4/profile/treatments', async t => {
    const treatment = __treatment_builder();
	const {content} = await mobileapi(['POST', `/api/v4/profile/treatments?debug=1`, 201], { body: treatment });
	const schema = {
        "status": "string",
        "message": "string",
        "data": {
            "id": "string"
        }
	};
	if(!_.has(content, 'data.id')) {
		return t.fail('Response error: no "id" in "content.data"');
	}
	const validate = tv4.validate(JSON.stringify(content), schema, true);
	if(!validate) {
		console.log(tv4.error);
		return t.fail('Treatment: JSON schema validation');
	}
	store().update('patient.test.context.treatment', (ctx) => content.data.id).write();
});

test.skip('<- [patient] GET /api/v4/profile/treatments/:treatmentId ', async t => {
    const treatmentId = store().get('patient.test.context.treatment').value();
    t.truthy(treatmentId, 'Cannot resolve {treatmentId}');
    if(!treatmentId) return;
    // -----------------------------
	const {content} = await mobileapi(['GET', `/api/v3/profile/treatments/${treatmentId}?debug=1`, 200]);
	t.is(content.status, 'ok', '"ok" expected in content.status');
	t.is(content.message, 'success', '"success" expected in content.message');
	t.true(_.has(content, 'data.id'), '"data" must be an instance of treatment');
});

test.skip('-> [patient] treatment edit\t PUT /api/v4/profile/treatments/:id', async t => {
	const treatmentId = store().get('patient.test.context.treatment').value();
	t.truthy(treatmentId, 'Cannot resolve {treatmentId}');
    if(!treatmentId) return;
	const new_title = "Treatment Edited";
	const treatment = { "title": new_title };
	const {content} = await mobileapi(['PUT', `/api/v4/profile/treatments/${treatmentId}`, 200], { body: treatment });
	t.is(content.status, 'ok', '"ok" expected in $response.status');
	t.is(content.message, 'success', '"success" expected in $response.message');
	t.true(_.has(content, 'data.id'), '"data" must be an instance of treatment');
	const $response_check = await mobileapi(['GET', `/api/v4/profile/treatments/${treatmentId}`, 200]);
	t.true(_.has($response_check, 'content.data.id'), 'Cannot get content.data.id on $response_check');
	t.is($response_check.content.data.title, new_title, 'Title is NOT updated!');
});

test.skip('-x [patient] treatment delete\t DELETE /api/v4/profile/treatments/:id', async t => {
	const treatmentId = store().get('patient.test.context.treatment').value();
	t.truthy(treatmentId, 'Cannot resolve {treatmentId}');
    if(!treatmentId) return;
	const {content} = await mobileapi(['DELETE', `/api/v4/profile/treatments/${treatmentId}`, 200], { body: { id: treatmentId} });
	t.is(content.status, 'ok', '"ok" expected in $response.status');
	t.is(content.message, 'success', '"success" expected in $response.message');
});

