'use strict';

const res_dict = {"hello": "Hi", "name":"Abhi", "server":"websocket", "hi": "hello", "version": "1.0", "on": {"query": "cmd", "state": "on"}, "off": {"query": "cmd", "state": "off"}}

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');
// //   ws.send('connected OK!')
wss.on('connection', function connection(ws) {
  console.log('Client connected');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    let res = res_dict[message]
    // ws.send(res);
    if (res != ''){
    myfunction(res);
    };
  });
  ws.on('close', () => console.log('Client disconnected'));
});

function myfunction(res) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(res));
  // console.log(client.send('1234'));
  });
};



// 'use strict';

// const express = require('express');
// const SocketServer = require('ws').Server;
// const path = require('path');

// const PORT = process.env.PORT || 3000;
// const INDEX = path.join(__dirname, 'index.html');

// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// const wss = new SocketServer({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');
//   ws.send('connected OK!');
// });

// wss.on('close', () => console.log('Client disconnected'));

// wss.on('message', (message, ws) => {
//   console.log(message);
//   ws.send('Message Received');
// });



// wss.clients.forEach((client) => {
// //     client.send(new Date().toTimeString());
// //   });

// wss.clients.forEach((client) => {
//     client.send('Connected OK!');
//   console.log(client.send('1234'));
// //   });

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);
