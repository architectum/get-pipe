import test from 'ava';
const auth = require('../../shared/auth');

test.todo('common');
test('auth:doctor', auth.doctor_before_hook)
test('auth:patient', auth.patient_before_hook)
