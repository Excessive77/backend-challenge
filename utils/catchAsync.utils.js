const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    };
};

module.exports = { catchAsync };

/**
 * Esta función actua como un canalizador de errores para todos nuestros controladores y funciones asincronas que necesitemos.
 * Con la finalidad de hacer mas limpios los controladores y no tener que usar en todo moemnto la función try - catch
 *  */
