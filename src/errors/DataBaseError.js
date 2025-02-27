export class DataBaseError extends Error(){
    constructor(message) {
        super("Error en base de datos...");
        this.name = 'DataBaseError';
        this.statusCode = 500
        this.debugInfo = message
    }
}