const jwt = require('jsonwebtoken');
const fs = require('fs');
const secret = fs.readFileSync('security/public-token.pem', { encoding: 'utf8', flag: 'r' }).trim();
if (!secret) throw new Error('{{secret}} required for JWT');
module.exports = (token) => jwt.verify(token, secret, { algorithms: ["RS512"], issuer: 'appotek' });
