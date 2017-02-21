// attempt to use express, I guess it's working
const express = require('express');

const app = express();

const path = require('path');

const server = require('http').createServer(app);

const socketio = require('socket.io');

let score = 0;

// not sure if this is supposed to be better than the way you showed us
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/index.html`));
});
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/styles.css`));
});

server.listen(3000);

const io = socketio(server);

io.on('connection', (socket) => {
  socket.join('room1');
  socket.on('updateScore', (data) => {
    score += data;

    io.sockets.in('room1').emit('updated', score);
  });

  socket.on('disconnect', () => {
    socket.leave('room1');
  });
});

console.log('listening on port 3000');
