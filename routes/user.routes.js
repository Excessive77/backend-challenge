const express = require('express');

//Controllers
const { createUser, login } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/auth/register', createUser);

usersRouter.post('/auth/login', login);

module.exports = { usersRouter };
