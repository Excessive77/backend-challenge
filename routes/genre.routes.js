const express = require('express');

//Constrollers
const {
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre,
    assingMovieToGenre,
} = require('../controllers/genre.controller');

//Middlwares
const { protectSession } = require('../middlewares/auth.middleware');
const { genreExists } = require('../middlewares/genre.middleware');

const genresRouter = express.Router();

genresRouter.use(protectSession);

genresRouter.get('/', getGenres);

genresRouter.post('/', createGenre);

genresRouter.post('/assing-genre', assingMovieToGenre);

genresRouter.patch('/:id', genreExists, updateGenre);

genresRouter.delete('/:id', genreExists, deleteGenre);

module.exports = { genresRouter };
