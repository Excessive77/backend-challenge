class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('5') ? 'Fail' : 'error';

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { AppError };
/**
 * Esta función nos permite capturar cualquier error que se produzca a la hora de hacer una petición
 * Actua como un manejador de errores
 */
