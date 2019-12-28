const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../01-auth/auth-router.js');
const usersRouter = require('../05-users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;