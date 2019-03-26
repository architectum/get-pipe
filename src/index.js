const handler = require('./server');
const { router, get, post, patch, put } = require('microrouter')

module.exports = router(
  post('/api/v4/patients/:patient/treatment/full/', handler('patient.treatment.new')),
  get('/api/v4/profile/treatments/', handler('patient.treatment.list')),
  /* ? */ get('/api/v4/patients/:patient/treatments', handler("doctor.treatment.list")),
  /* ? */ get('/api/v4/patients/:patient/treatments/:id', handler("doctor.treatment.one")),
  /* ? */ post('/api/v4/profile/treatments', handler("doctor.treatment.new")),
  get('/api/v4/profile/templates', handler("doctor.template.list")),
  post('/api/v4/profile/templates', handler("doctor.template.new")),
  get('/api/v4/profile/templates/:id', handler("doctor.template.one")),
  put('/api/v4/profile/templates/:id', handler("doctor.template.edit")),
  patch('/api/v4/profile/templates/:id', handler("doctor.template.edit")),

  get('/api/v4', handler()),
);
