//Libs
const dotenv = require('dotenv');

//Import app
const { app } = require('./app');
const { initModels } = require('./models/initModels');

//Enviroment variables
dotenv.config({ path: '.env' });

//Utils

const { db } = require('./utils/database.utils');

const startServer = async () => {
    try {
        db.authenticate()
            .then(() => console.log('Database authenticated'))
            .catch(err => console.log(err));

        initModels();

        db.sync()
            .then(() => console.log('Database synced'))
            .catch(err => console.log(err));

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log('Is alive on port: ' + port);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
