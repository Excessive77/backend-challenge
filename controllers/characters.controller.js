const { Character } = require('../models/character.model');
// const { characterInMovie } = require('../models/characterInMovie.model');
// const { Movie } = require('../models/movie.model');
// const { characterInMovie } = require('../models/characterInMovie.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getCharacters = catchAsync(async (req, res, next) => {
    const characters = await Character.findAll({
        where: { status: 'active' },
        attributes: ['id', 'img', 'name'],
    });

    res.status(200).json({
        status: 'success',
        characters,
    });
});

const getCharacterByName = catchAsync(async (req, res, next) => {
    const { character } = req;

    res.status(200).json({
        status: 'success',
        character,
    });
});

const getCharacterByAge = catchAsync(async (req, res, next) => {
    const { character } = req;

    res.status(200).json({
        status: 'success',
        character,
    });
});

const createCharacter = catchAsync(async (req, res, next) => {
    const { img, name, age, weight, history } = req.body;

    const newCharacter = await Character.create({
        img,
        name,
        age,
        weight,
        history,
    });

    res.status(201).json({
        status: 'success',
        newCharacter,
    });
});

const updateCharacter = catchAsync(async (req, res, next) => {
    const { character } = req;
    const { name, age, weight, history } = req.body;

    await character.update({
        name,
        age,
        weight,
        history,
    });

    res.status(200).json({
        status: 'success',
        message: 'character updated',
    });
});

const deleteCharacter = catchAsync(async (req, res, next) => {
    const { character } = req;

    await character.update({ status: 'deleted' });

    res.status(200).json({ status: 'success', message: 'character deleted' });
});

module.exports = {
    getCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacterByName,
    getCharacterByAge,
};
