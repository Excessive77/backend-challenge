const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

dotenv.config({ path: '.env' });

const protectSession = catchAsync(async (req, res, next) => {
    let token;

    //Extract the token from headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Invalid authorization', 403));
    }

    //Ask JWT (Library) if the token is still validate
    const decoded = await jwt.verify(token, process.env.JWT);

    //Check in db that user still exists
    const user = await User.findOne({
        where: { id: decoded.id, status: 'active' },
    });

    if (!user) {
        return next(
            new AppError('The owner of this token does not exist', 403)
        );
    }

    req.sessionUser = user;
    next();
});

module.exports = {
    protectSession,
};
