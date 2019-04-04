const api = require('./api');
const patientTreatments = require('./patient/treatments');
const doctorTemplates = require('./doctor/templates');
const doctorTreatments = require('./doctor/treatments');

module.exports = {
  ...patientTreatments,
  ...doctorTemplates,
  ...doctorTreatments,
  
  'bridge': async  (req, res, authorization) => {
    console.log('bridge');
    const {status, body} = await api.call(req.url || '/', authorization);
    return [200, output];
  }
}