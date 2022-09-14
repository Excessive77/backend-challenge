const { db, DataTypes } = require('../utils/database.utils');

const movieInGenre = db.define('movieInGenre', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },
});

module.exports = { movieInGenre };
