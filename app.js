// app.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use('/', routes);

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('subscribeToFile', (fileId) => {
//     socket.join(fileId);
//     console.log(`User subscribed to updates for file ${fileId}`);
//   });

//   socket.on('fileAccessChange', (data) => {
//     const { fileId, usersWithAccess } = data;
//     io.to(fileId).emit('fileAccessUpdate', { usersWithAccess });
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
