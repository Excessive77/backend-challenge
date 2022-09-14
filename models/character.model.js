const { db, DataTypes } = require('../utils/database.utils');

const Character = db.define('character', {
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

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    weight: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    history: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },
});

module.exports = { Character };
