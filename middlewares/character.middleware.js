//Models
const { Character } = require('../models/character.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');
const { Movie } = require('../models/movie.model');

const findCharacterByName = catchAsync(async (req, res, next) => {
    const { name } = req.params;

    const character = await Character.findOne({
        where: { name, status: 'active' },
        include: { model: Movie },
    });

    if (!character) {
        return next(new AppError('Character not found with that name', 404));
    }

    req.character = character;
    next();
});

const findCharacterByAge = catchAsync(async (req, res, next) => {
    const { age } = req.params;

    const character = await Character.findAll({
        where: { age },
        include: { model: Movie },
    });

    if (!character) {
        return next(new AppError('Character not found with that age', 404));
    }

    req.character = character;
    next();
});

const characterExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const character = await Character.findOne({ where: { id } });

    if (!character) {
        return next(new AppError('Character not found', 404));
    }

    req.character = character;
    next();
});

module.exports = { findCharacterByName, characterExists, findCharacterByAge };
