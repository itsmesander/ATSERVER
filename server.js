'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
var fs = require('fs');
var parser = require('json-parser');
var settings = "";
var state = {};

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  fs.readFile(__dirname + '/settings.json', function(err, data) {
    settings = parser.parse(data);
    console.log("settings loaded :: ");
    console.log(settings);

    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log('Client connected');
      socket.emit('settings', settings);

      for (let param of settings.params) {
        socket.on(param, (data)=>{
          state[param] = data;
          io.emit(param, data);
          io.emit("state", state);
        });
      }

      socket.on('disconnect', () => console.log('Client disconnected'));
    });
  });
