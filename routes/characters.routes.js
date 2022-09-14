const express = require('express');

//Constrollers
const {
    getCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacterByName,
    getCharacterByAge,
} = require('../controllers/characters.controller');

//Middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const {
    findCharacterByName,
    findCharacterByAge,
    characterExists,
} = require('../middlewares/character.middleware');

const charactersRouter = express.Router();

charactersRouter.use(protectSession);

charactersRouter.get('/', getCharacters);

charactersRouter.post('/', createCharacter);

charactersRouter.get('/name/:name', findCharacterByName, getCharacterByName);

charactersRouter.get('/age/:age', findCharacterByAge, getCharacterByAge);

charactersRouter.patch('/:id', characterExists, updateCharacter);

charactersRouter.delete('/:id', characterExists, deleteCharacter);

module.exports = { charactersRouter };
