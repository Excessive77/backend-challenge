//Models
const { Genre } = require('../models/genre.model');
const { Movie } = require('../models/movie.model');
const { movieInGenre } = require('../models/movieInGenre.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getGenres = catchAsync(async (req, res, next) => {
    const genres = await Genre.findAll({
        where: { status: 'active' },
        include: { model: Movie, attributes: ['id', 'title'] },
    });

    res.status(200).json({
        status: 'success',
        genres,
    });
});

const createGenre = catchAsync(async (req, res, next) => {
    const { name, img } = req.body;

    const newGenre = await Genre.create({
        name,
        img,
    });

    res.status(201).json({
        status: 'success',
        newGenre,
    });
});

const updateGenre = catchAsync(async (req, res, next) => {
    const { genre } = req;
    const { name } = req.body;

    await genre.update({ name });
    res.status(200).json({ status: 'success' });
});

const deleteGenre = catchAsync(async (req, res, next) => {
    const { genre } = req;

    await genre.update({ status: 'deleted' });

    res.status(200).json({ status: 'success' });
});

const assingMovieToGenre = catchAsync(async (req, res, next) => {
    const { movieId, genreId } = req.body;

    const newMovieInGenre = await movieInGenre.create({
        movieId,
        genreId,
    });

    res.status(201).json({
        status: 'success',
        newMovieInGenre,
    });
});

module.exports = {
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre,
    assingMovieToGenre,
};
