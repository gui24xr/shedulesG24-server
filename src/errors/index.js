class DataBaseError extends Error{
    constructor(message) {
        super("Error en base de datos...");
        this.name = 'DataBaseError';
        this.statusCode = 500
        this.debugInfo = message
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 403; // 401 si prefieres
    }
}


class OperationNotAllowedError extends Error {
    constructor(message) {
        super(message);
        this.name = "OperationNotAllowedError";
        this.statusCode = 422; // O 405 dependiendo del caso
    }
}

export {
    DataBaseError, 
    UnauthorizedError, 
    OperationNotAllowedError
}