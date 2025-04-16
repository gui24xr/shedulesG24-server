export default class LoggerManager {
    
    constructor(logger) {
        if (!logger || typeof logger !== 'object') throw new Error('Se requiere un logger válido');
        
        const requiredMethods = ['info', 'error', 'warn', 'debug'];
        const missingMethods = requiredMethods.filter(method => typeof logger[method] !== 'function');
        
        if (missingMethods.length > 0) {
            throw new Error(`El logger debe implementar los siguientes métodos: ${missingMethods.join(', ')}`);
        }

        this.logger = logger;
        if (LoggerManager.instance) return LoggerManager.instance;
        LoggerManager.instance = this;
        return this;
    }

   
    log(message) {
        try {
            this.logger.info(message);
        } catch (error) {
            console.error('Error al registrar log:', error);
        }
    }

    
    error(message, error = null) {
        try {
            if (error) {
                this.logger.error(`${message} - ${error.stack || error.message || error}`);
            } else {
                this.logger.error(message);
            }
        } catch (err) {
            console.error('Error al registrar error:', err);
        }
    }
    

 
    warn(message) {
        try {
            this.logger.warn(message);
        } catch (error) {
            console.error('Error al registrar advertencia:', error);
        }
    }

   
    debug(message, data = null) {
        try {
            if (data) {
                this.logger.debug(`${message} - ${JSON.stringify(data)}`);
            } else {
                this.logger.debug(message);
            }
        } catch (error) {
            console.error('Error al registrar debug:', error);
        }
    }
}