import { CustomError } from "./CustomError.js";
import { InternalServerError } from "../errors/TypesError.js";

export class ValidationError extends CustomError {
    constructor(message, details) {
        super(message || 'Error de validación', 400, details);
    }
}

export class DataBaseError extends CustomError {
    constructor(message, details) {
        super(message || 'Error en la comunicacion con la Base de datos', 500, details);
    }
}

export class NotFoundError extends CustomError {
    constructor(message, details, entity) {
        super(message || `${entity} No encontrado`, 404, details);
    }
}

export class MailError extends CustomError {
    constructor(message, details) {
        super(message || 'Error al enviar el email', 500, details);
    }
}

export class InternalServerError extends CustomError {
    constructor(message, details) {
        super(message || 'Error interno del servidor', 500, details);
    }
}