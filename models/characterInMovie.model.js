const { db, DataTypes } = require('../utils/database.utils');

const characterInMovie = db.define('characterInMovie', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },

    characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },
});

module.exports = { characterInMovie };
