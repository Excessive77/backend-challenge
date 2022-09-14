//Models
const { Movie } = require('../models/movie.model');
const { Genre } = require('../models/genre.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

const findMovieByName = catchAsync(async (req, res, next) => {
    const { title } = req.params;

    const movie = await Movie.findOne({
        where: { title, status: 'active' },
        include: { model: Genre },
    });

    if (!movie) {
        return next(new AppError('Movie not found with that name', 404));
    }

    req.movie = movie;
    next();
});

const findMovieByGenre = catchAsync(async (req, res, next) => {
    const { name } = req.params;

    const genre = await Genre.findOne({
        where: { name, status: 'active' },
        include: { model: Movie },
    });

    if (!genre) {
        return next(new AppError('Genre not found with that name', 404));
    }

    req.genre = genre;
    next();
});

const movieExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const movie = await Movie.findOne({ where: { id } });

    if (!movie) {
        return next(new AppError('Movie not found', 404));
    }

    req.movie = movie;
    next();
});

module.exports = { findMovieByName, findMovieByGenre, movieExists };
