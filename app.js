const express = require('express');

//Routes
const { usersRouter } = require('./routes/user.routes');
const { charactersRouter } = require('./routes/characters.routes');
const { moviesRouter } = require('./routes/movies.routes');
const { genresRouter } = require('./routes/genre.routes');

//Global error handler
const { globalErrorHandler } = require('./controllers/error.controller');

//Utils
const { AppError } = require('./utils/appError.utils');

const app = express();
app.use(express.json());

//Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/characters', charactersRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/genres', genresRouter);

//All of that is not on this server
app.all('*', (req, res, next) => {
    next(
        new AppError(
            `${req.method} ${req.originalUrl} Not found on this server`,
            404
        )
    );
});

app.use(globalErrorHandler);

module.exports = { app };
