'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocs = require('./swagger.json');
var dotenv = require('dotenv');
const cors = require('cors');

const loginRoutes = require('./routes/api/v1/login');
const jwt = require('./middlewares/jwtAuth');

//Create server express
const app = express();

//SocketIo
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// Config for load .env files
dotenv.config();

// Create connection database Mongo whit Mongoose
const connection = require('./services/connectionBD_Mongo');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// General functions server setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
const swagger = require('swagger-node-express');
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Directory static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//==================================================================
//Configura Swagger for documentation API
//==================================================================
app.use(
  '/api/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    explorer: true,
    swaggerOptions: {}
  })
);
swagger.setAppHandler(app);

//==================================================================
//Routes
//==================================================================
// Website routes
app.use('/', require('./routes/index'));

// Api routers
app.use('/api/v1/chat/message', require('./routes/api/v1/chat/message'));
app.use('/api/v1/chat/conversation', require('./routes/api/v1/chat/conversation'));
app.use('/api/v1/user', require('./routes/api/v1/users'));
app.use('/api/v1/advertisements', require('./routes/api/v1/advertisement'));
app.use('/api/v1/categories', require('./routes/api/v1/category'));
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/uploads', require('./routes/api/v1/upload'));

//==================================================================
//Socket io
//==================================================================

// let users = [];

// //Method add user conected list
// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({
//       userId,
//       socketId
//     });
// };

// //Delete user connected list
// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// //Return user
// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// //Connection receibe socket client connection
// io.on('connection', (socket) => {
//   console.log('A user socket connected: ', socket.id);

//   //Add user connected list
//   socket.on('addUser', (userId) => {
//     addUser(userId, socket.id);

//     //Return users online
//     io.emit('getUsers', users);
//   });

//   //Send and get message
//   socket.on('sendMessage', ({userSenderId, userReceiverId, text}) => {
//     const user = getUser(userReceiverId);
//     io.to(user.socketId).emit('getMessage', {
//       userSenderId,
//       text
//     });
//   });

//   //Delete user connected list
//   socket.on('disconnect', () => {
//     console.log('A user disconnected.');
//     removeUser(socket.id);

//     //Return users online
//     io.emit('getUsers', users);
//   });
// });

//==================================================================
//Errors
//==================================================================
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
