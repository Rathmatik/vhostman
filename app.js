/* Set process name */
process.title = process.argv[2];

const bouncy = require('bouncy');
const hosts  = require('./config/hosts.json');
const port   = 80;

/* Create a bouncy request handler */
const requestHandler = (request, response, bounce) => {
  /* Obtain hostname from the request headers */
  var host = hosts[request.headers.host];

  /* Redirect to the configured hostname/port, if this host exists */
  if (host) {
    bounce(host.hostname, host.port);
  }
  /* Otherwise, return 404 */
  else {
    response.statusCode = 404;
    response.end('No such host.');
  }
};

/* Start listening on port 80 */
bouncy(requestHandler).listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
