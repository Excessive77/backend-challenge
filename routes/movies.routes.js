const express = require('express');

//Controllers
const {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    assingCharacterToMovie,
    getMovieByName,
    getMoviesByGenre,
} = require('../controllers/movies.controller');

//Middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const {
    findMovieByName,
    findMovieByGenre,
    movieExists,
} = require('../middlewares/movie.middleware');

const moviesRouter = express.Router();

moviesRouter.use(protectSession);

moviesRouter.get('/', getMovies);

moviesRouter.post('/', createMovie);

moviesRouter.post('/assing-character', assingCharacterToMovie);

moviesRouter.get('/name/:title', findMovieByName, getMovieByName);

moviesRouter.get('/genre/:name', findMovieByGenre, getMoviesByGenre);

moviesRouter.patch('/:id', movieExists, updateMovie);

moviesRouter.delete('/:id', movieExists, deleteMovie);

module.exports = { moviesRouter };
