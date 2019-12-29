const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../01-auth/auth-router.js');
const usersRouter = require('../05-users/users-router.js');
const studentsRouter = require('../03-students/students-router')
const helpersRouter = require('../04-helpers/helpers-router')
const ticketsRouter = require('../02-tickets/tickets-router')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/students', studentsRouter);
server.use('/api/helpers', helpersRouter);
server.use('/api/tickets', ticketsRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
