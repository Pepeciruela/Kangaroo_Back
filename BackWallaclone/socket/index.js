const io = require('socket.io')(8900, {
  cors: {
    // origin: 'http://localhost:3001'
    origin: '*'
  }
});

let users = [];

//Method add user conected list
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({
      userId,
      socketId
    });
};

//Delete user connected list
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

//Return user
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

//Connection receibe socket client connection
io.on('connection', (socket) => {
  console.log('A user socket connected: ', socket.id);

  //Add user connected list
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);

    //Return users online
    io.emit('getUsers', users);
  });

  //Send and get message
  socket.on('sendMessage', ({userSenderId, userReceiverId, text}) => {
    const user = getUser(userReceiverId);
    io.to(user.socketId).emit('getMessage', {
      userSenderId,
      text
    });
  });

  //Delete user connected list
  socket.on('disconnect', () => {
    console.log('A user disconnected.');
    removeUser(socket.id);

    //Return users online
    io.emit('getUsers', users);
  });
});
