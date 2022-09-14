const { db, DataTypes } = require('../utils/database.utils');

const Movie = db.define('movie', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },

    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    dateCreation: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    qualifying: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },
});

module.exports = { Movie };
