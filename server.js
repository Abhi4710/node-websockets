'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send('connected OK!')
  ws.on('close', () => console.log('Client disconnected'));
});

wss.on('message', (message) => {
  console.log(message);
  let msg = message;
  ws.send('ok ' + msg);
});

// wss.clients.forEach((client) => {
// //     client.send(new Date().toTimeString());
// //   });

// wss.clients.forEach((client) => {
//     client.send('Connected OK!');
//   console.log(client.send('1234'));
//   });

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);
