const express = require('express');
const config = require('./config');
const app = express();

app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile('./dist/index.html');
});

const server = app.listen(config.port, function() {
  let port = config.port;
  console.log('Socket server listening at: ' + port);
});

const io = require('socket.io')(server);

io.of('/arduino').on('connection', (socket) => {

  console.log('New connection: ' + socket.id);

  socket.on('res:start', function() {
    socket.broadcast.emit('res:start');
  });

  socket.on('res:change', function(value) {
    socket.broadcast.emit('res:change', value);
  });
});
