import  LoggerManager  from './managers.logger.js'
import JwtManager from './managers.jwt.js'
import { logger } from '../config/logger.config.js'

const loggerManager = new LoggerManager(logger)
const jwtManager = new JwtManager(loggerManager)

export {
    loggerManager,
    jwtManager
}
