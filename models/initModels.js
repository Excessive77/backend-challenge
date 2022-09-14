//Models
const { Character } = require('./character.model');
const { Movie } = require('./movie.model');
// const { characterInMovie } = require('./characterInMovie.model');
const { Genre } = require('./genre.model');
// const { movieInGenre } = require('./movieInGenre.model');

const initModels = () => {
    Character.belongsToMany(Movie, { through: 'characterInMovie' });
    Movie.belongsToMany(Character, { through: 'characterInMovie' });

    Movie.belongsToMany(Genre, { through: 'movieInGenre' });
    Genre.belongsToMany(Movie, { through: 'movieInGenre' });
};

module.exports = { initModels };
