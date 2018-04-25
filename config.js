const config = {
  host: 'http://192.168.100.7',
  namespace: 'arduino', // For socket.io
  port: 4000
};

const production = {
  host: 'https://arduino-sockets.herokuapp.com', // Replace
  namespace: 'arduino' // For socket.io
};

const port = config.port ? ':' + config.port : '';
const namespace = config.namespace ? config.namespace : '';
const url = config.host + port + '/' + namespace;
config.url = url;

module.exports = config;
