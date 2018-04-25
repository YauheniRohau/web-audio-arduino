var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");
const config = require('./config');

var sp = new VirtualSerialPort({
  host: '192.168.100.9'
});
const io = require('socket.io-client');

const socket = io.connect(config.url);

var ioBoard = new firmata.Board(sp);
ioBoard.once('ready', function() {
  console.log('IO Ready');
  ioBoard.isReady = true;

  var board = new five.Board({ io: ioBoard, repl: true });

  board.on('ready', function() {
    console.log('five ready');
    //Full Johnny-Five support here:
    potentiometer = new five.Sensor({
      pin: "A0",
      freq: 250
    });

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
      pot: potentiometer
    });



    socket.on('res:start', function() {
      potentiometer.once("data", function() {
        socket.emit('res:change', this.value);
        console.log(this.value);
      });
    });



    // "data" get the current reading from the potentiometer
    potentiometer.on("change", function() {
      socket.emit('res:change', this.value);
    });
  });
});



