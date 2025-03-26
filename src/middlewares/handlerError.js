import { z } from 'zod'
import { logger } from '../config/logger.config.js'

const errorHandlerMiddleware = ((error, req, res, next) => {
    logger.info("Middlewares de errores: ", error);
    if (error instanceof z.ZodError)
        return res.status(400).json({
            message: "Error de validación",
            errors: error.errors,
        })
    return res.status(500).json({ error: error.message })
})

export default errorHandlerMiddleware
