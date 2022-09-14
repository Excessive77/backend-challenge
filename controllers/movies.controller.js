//Models
const { Movie } = require('../models/movie.model');
const { characterInMovie } = require('../models/characterInMovie.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getMovies = catchAsync(async (req, res, next) => {
    const movies = await Movie.findAll({
        where: { status: 'active' },
        attributes: ['id', 'img', 'title', 'dateCreation'],
    });

    res.status(200).json({
        status: 'success',
        movies,
    });
});

const getMovieByName = catchAsync(async (req, res, next) => {
    const { movie } = req;

    res.status(200).json({
        status: 'success',
        movie,
    });
});

const getMoviesByGenre = catchAsync(async (req, res, next) => {
    const { genre } = req;

    res.status(200).json({
        status: 'success',
        genre,
    });
});

const createMovie = catchAsync(async (req, res, next) => {
    const { img, title, dateCreation, qualifying } = req.body;

    const newMovie = await Movie.create({
        img,
        title,
        dateCreation,
        qualifying,
    });

    res.status(201).json({
        status: 'success',
        newMovie,
    });
});

const updateMovie = catchAsync(async (req, res, next) => {
    const { movie } = req;
    const { img, title, dateCreation, qualifying } = req.body;

    await movie.update({
        img,
        title,
        dateCreation,
        qualifying,
    });

    res.status(200).json({
        status: 'success',
    });
});

const deleteMovie = catchAsync(async (req, res, next) => {
    const { movie } = req;

    await movie.update({ status: 'deleted' });

    res.status(200).json({ status: 'success' });
});

const assingCharacterToMovie = catchAsync(async (req, res, next) => {
    const { characterId, movieId } = req.body;

    const newCharacterInMovie = await characterInMovie.create({
        characterId,
        movieId,
    });

    res.status(201).json({
        status: 'success',
        newCharacterInMovie,
    });
});

module.exports = {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    assingCharacterToMovie,
    getMovieByName,
    getMoviesByGenre,
};
