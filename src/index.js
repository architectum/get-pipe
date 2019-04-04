const handler = require('./server');
const { router, get, post, patch, put, del } = require('microrouter')

module.exports = router(
  // ------ patient treatment
  get('/api/v4/profile/treatments',       handler("patient.treatment.list")),
  get('/api/v4/profile/treatments/:id',   handler("patient.treatment.one")),
  // post('/api/v4/patients/:patient/treatment/full',      handler("patient.treatment.new")), // ======== DEBUG
  post('/api/v4/profile/treatments',      handler("patient.treatment.new")),
  // patch('/api/v4/profile/treatments/:id', handler("patient.treatment.edit")),
  // put('/api/v4/profile/treatments/:id',   handler("patient.treatment.edit")),
  // del('/api/v4/profile/treatments/:id',   handler("patient.treatment.delete")),

  // // ------ doctor treatment
  get('/api/v4/patients/:patientId/treatments',       handler("doctor.treatment.list")),
  get('/api/v4/patients/:patientId/treatments/:id',   handler("doctor.treatment.one")),
  post('/api/v4/patients/:patientId/treatments',      handler("doctor.treatment.new")),
  // patch('/api/v4/patients/:patientId/treatments/:id', handler("doctor.treatment.edit")),
  // put('/api/v4/patients/:patientId/treatments/:id',   handler("doctor.treatment.edit")),
  // del('/api/v4/patients/:patientId/treatments/:id',   handler("doctor.treatment.delete")),

  // // ------ doctor template
  get('/api/v4/profile/templates',        handler("doctor.template.list")),
  get('/api/v4/profile/templates/:id',    handler("doctor.template.one")),
  post('/api/v4/profile/templates',       handler("doctor.template.new")),
  patch('/api/v4/profile/templates/:id',  handler("doctor.template.edit")),
  put('/api/v4/profile/templates/:id',    handler("doctor.template.edit")),
  del('/api/v4/profile/templates/:id',    handler("doctor.template.delete")),

  // get('/api/v3/*', handler('bridge')),
);
