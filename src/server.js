const {send} = require('micro');
const routes =  require('./handlers');
const querystring = require('querystring');

module.exports = (routePath) => async (req, res) => {
  const {authorization} = req.headers;

  const urlParts = req.url.split('?');
  urlParts.shift();
  const {debug} = querystring.parse(urlParts.shift());


  const handler = !!routes[routePath] ? routes[routePath] : (req, res, authorization) => [404, {'message': 'Not found', 'status': 'error', 'data': null}] ;

  try {
    const [code, output] = await handler(req, res, authorization);
    return send(res, code, output);
  } catch(e) {
    let code = 500;
    let message = e.message || '500@Server error';
    message = (message.length == 3 && message == 404) ? `${message}@Not found` : message;
    if(message[3] == '@') {
      [code, message] = message.split('@');
    }
    const output = {
      "code": code, 
      "message": message
    };
    const stack = ('stack' in e) ? e.stack.split('\n') : null;
    if(!!stack && Array.isArray(stack) && debug) {
      output.stack = {
        'error': stack.shift(),
        'call': stack.map(p => p.replace(process.env.PWD, '.'))
      };
    }
    return send(res, code, output);
  }

}
