process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const API_HOST = process.env.API_HOST || "https://api.appotek.com:3001";
const fetch = require('node-fetch');

const apiCall = async (path, authorization, method = 'get', payload = false) => {
    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': authorization },
    };
    if(method !== 'get' && method !== 'head' && !!payload) {
        options.body = payload;
    }
    console.log(`${method.toUpperCase()} :: ${path} =>`);
    return await fetch(`${API_HOST}${path.replace('/v4', '/v3')}`, options).then(async (res) => {
        return {
            'status': res.status,
            'body': await res.json()
        };
    });
}

module.exports = {
    "call": apiCall,
    "get": (path, authorization) => apiCall(path, authorization, 'get'),
    "post": (path, authorization, payload) => apiCall(path, authorization, 'post', payload),
    "put": (path, authorization, payload) => apiCall(path, authorization, 'put', payload),
    "patch": (path, authorization, payload) => apiCall(path, authorization, 'patch', payload),
    "delete": (path, authorization, payload) => apiCall(path, authorization, 'delete', payload),
};