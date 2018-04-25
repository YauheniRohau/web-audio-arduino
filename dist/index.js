const socket = io.connect('http://192.168.100.7:4000/arduino');


var context = new (window.AudioContext || window.webkitAudioContext)();


var oscillator = context.createOscillator();
oscillator.frequency.value = 0;
socket.emit('res:start');

oscillator.type = 'sine';
oscillator.connect(context.destination);
oscillator.start();

socket.on('res:change', function(value) {
  oscillator.frequency.value = value;
  console.log(value);
});

