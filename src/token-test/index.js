const jwt = require('jsonwebtoken')


const user_data = {
    id: 8814,
    nickname: "@onegin_online",
    role: 3
};

const token = jwt.sign(user_data, 'meow', { algorithm: 'HS512' });
console.log(token);