const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'Failed',
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

module.exports = { globalErrorHandler };

/**
 * esta funcion nos ayuda a capturar cualquier error global que pueda suceder durante la ejecución de esta aplicación
 */
