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


test('<- [doctor]\t|\ttemplate list\t\t| GET /api/v4/profile/templates', async t => {
	const {content} = await api(['GET', '/api/v4/profile/templates', 200]);
	t.is(content.status, 'ok', '"ok" expected in content.status');
	t.is(content.message, 'success', '"success" expected in content.message');
	t.true(_.has(content, 'data') && Array.isArray(content.data), '"data" must be an array in content');
	if(content.data.length > 0) {
		const template = content.data.shift();
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
	} else {
		t.pass('Empty "data" in $response');
	}
});

test('-> [doctor]\t|\ttemplate create\t\t| POST /api/v4/profile/templates', async t => {
	const template = __treatment_builder();
	const {content} = await api(['POST', '/api/v4/profile/templates', 201], { body: template });
	t.is(content.status, 'ok', '"ok" expected in content.status');
	t.is(content.message, 'success', '"success" expected in content.message');
	t.true(_.has(content, 'data.id'), '"data" must be an instance of template');
	store().update('test.context.template', (ctx) => content.data.id).write();
});

test.skip('<- [doctor]\t|\ttemplate details\t| GET /api/v4/profile/templates/:id ', async t => {
	const template_id = store().get('test.context.template').value();
	t.truthy(template_id, 'Cannot resolve {template_id}');
	const {content} = await api(['GET', `/api/v4/profile/templates/${template_id}`, 200]);
	t.is(content.status, 'ok', '"ok" expected in content.status');
	t.is(content.message, 'success', '"success" expected in content.message');
	t.true(_.has(content, 'data.id'), '"data" must be an instance of template');
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
	t.true(templateFields.reduce((r,prop) => r && _.has(content.data, prop), true), `Required Template Fields is failed. // ${JSON.stringify(templateFields.reduce((result, prop) => _.assign(result, {[prop]: _.has(content.data, prop)}), {}))}`);
});

test.skip('-> [doctor]\t|\ttemplate edit\t\t| PUT /api/v4/profile/templates/:id', async t => {
	const template_id = store().get('test.context.template').value();
	t.truthy(template_id, 'Cannot resolve {template_id}');
	const new_title = "Treatment Edited";
	const template = { "title": new_title };
	const {content} = await api(['PUT', `/api/v4/profile/templates/${template_id}`, 200], { body: template });
	t.is(content.status, 'ok', '"ok" expected in $response.status');
	t.is(content.message, 'success', '"success" expected in $response.message');
	t.true(_.has(content, 'data.id'), '"data" must be an instance of template');
	const $response_check = await api(['GET', `/api/v4/profile/templates/${template_id}`, 200]);
	t.true(_.has($response_check, 'content.data.id'), 'Cannot get content.data.id on $response_check');
	t.is($response_check.content.data.title, new_title, 'Title is NOT updated!');
});


test.skip('-x [doctor]\t|\ttemplate delete\t\t| DELETE /api/v4/profile/templates/:id', async t => {
	const template_id = store().get('test.context.template').value();
	t.truthy(template_id, 'Cannot resolve {template_id}');
	const {content} = await api(['DELETE', `/api/v4/profile/templates/${template_id}`, 200], { body: { id: template_id} });
	t.is(content.status, 'ok', '"ok" expected in $response.status');
	t.is(content.message, 'success', '"success" expected in $response.message');
});

