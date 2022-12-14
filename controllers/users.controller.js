const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');

//utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');
const { Email } = require('../utils/email.utils');

//Enviroment variables
dotenv.config({ path: '.env' });

const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    //hash password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
    });

    //Remove password from response
    newUser.password = undefined;

    //Send the email
    await new Email(email).sendWelcome(newUser.name);

    res.status(201).json({
        status: 'success',
        newUser,
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate credentials (email)
    const user = await User.findOne({
        where: {
            email,
            status: 'active',
        },
    });

    if (!user) {
        return next(new AppError('Invalid credentials', 400));
    }

    //Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return next(new AppError('Invalid credentials', 400));
    }

    //Generate JWT (JsonWebToken)
    //Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')
    const token = await jwt.sign({ id: user.id }, process.env.JWT, {
        expiresIn: '15d',
    });

    //Send response
    res.status(200).json({
        status: 'success',
        token,
    });
});

module.exports = { createUser, login };
