import { Op } from 'sequelize';
import { NotFoundError, ValidationError } from "../../errors/TypeError.js";

export const isArrayValidate = (data) => {
    if (!Array.isArray(data))
        throw new ValidationError(
            "La data ingresada no es un arreglo"
        );
}

export const notFoundDataRequest = async (Model, pk) => {
    const data = await Model.findByPk(pk);
    if (!data) throw new NotFoundError(`Datos con la primary key ${pk} no encontrado en ${Model.name}`); 
}

export const isEmptyData = (data) => {
    if (!data || data.length === 0) {
        throw new ValidationError(
            `La data ${field}ingresada esta vacia`
        );
    }
}

export const isEmptyResponseData = (data) => {
    if (!data || data.length === 0) {
        throw new NotFoundError(
            "La data solicitada no fue encontrada"
        );
    }
}

export const isValidDate = (fecha) => {
    if(!fecha) return new Date.now();
    const parseDate = new Date(fecha);
    
    if (isNaN(parseDate.getTime())) {
        throw new ValidationError(
            "La fecha enviada debe tener el formato de YYYY-MM-DD"
        );
    }
    return parseDate;
}

/**
 * Valida que el regsitro que se esta evaluando no exista previamente para un campo dado que se espera que sea único. En caso de existir un valor dúplicado en un campo único, arrojara un error de validación
 * @param {Model} Modelo - Modelo constructor de los datos que se comúnica con la DB
 * @param {object} data - Datos a evaluar en la petición hacia la DB 
 * @param {Array<string>} fields - Campo que se desea evaluar en la clausula Where
 * @param {string} excluidID - ID en formato UUID que será excluida de esta validación. Por defecto es null 
 * @throws {ValidationError} - Si el valor existe arrojara un error de validación 
 */

export const validateExistData = async (Modelo, data, fields, excluidID = null) => {
    const duplicatedFields = [];

    for (const field of fields) {

        if (data[field]) {

            const whereClause = { [field]: data[field] };

            //esto verifica si se debe excluir el registro que se esta evaluando (util update)
            if (excluidID) {
                whereClause.id = { [Op.ne]: excluidID }; //Op.ne => operador (sequeize) Not Equal(ne)
            }

            const existData = await Modelo.findOne({ where: whereClause });
            if (existData) {
                throw new ValidationError(`El campo ${field} ya está en uso en por otro registro en ${Modelo}`);
            }
        }
    }

    if (duplicatedFields.length > 0) {
        const fieldsString = duplicatedFields.map(field => `"${field}"`).join(', ');
        throw new ValidationError(`Los campos ${fieldsString} ya están en uso en por otro registro en "${Modelo.name}"`);
    }

} 