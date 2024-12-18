import { ValidationError } from "../errors/TypeError.js";
import { Usuario }  from "../models/Usuario.model.js"
import { validateExistData } from "../utils/validations/Validate.js";


export const createUser = async(req, res, next) => {
    try {

        await validateExistData(Usuario, req.body,'email');
        await validateExistData(Usuario, req.body,'telefono');

        const user = await Usuario.create(req.body);
        
        console.log(user)
        res.status(201).json({
            message: 'Usuario creado con éxito',
            status: 201,
            data: user,
        });
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async(req, res, next) => {
    try {
        const users = await Usuario.findAll();

        res.status (200).json({
            message: 'Usuarios encontrados con exito',
            status: 200,
            data: users,
        });
    } catch (error) {
        next(error)
    }
}

export const getAllActiveUsers  = async(req, res, next) => {
    try {
        const users = await Usuario.findAll({
            where: { active: true }
        });

        res.status (200).json({
            message: 'Usuarios activos encontrados con exito',
            status: 200,
            data: users,
        });
    } catch (error) {
        next(error)
    }
}

export const getUsersByFilters = async(req, res, next) => {
    try {
        const filters = req.query; // esto devuelve un objeto con los filtros
        const whereClause = {};

        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                whereClause[key] = filters[key];
            }
        }

        const users = await Usuario.findAll({
            where: { ...whereClause, active: true }
        })

        res.status (200).json({
            message: 'Usuarios encontrados con exito',
            status: 200,
            data: users,
        });
    } catch (error) {
        next(error)
    }
}


export const getUserById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const user = await Usuario.findByPk(id);

        res.status (200).json({
            message: 'Usuarios encontrado con exito',
            status: 200,
            data: user,
        });
    } catch (error) {
        next(error)
    }
}

export const getActiveUserById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const user = await Usuario.findOne({
            where: { id, active: true}
        });

        res.status (200).json({
            message: 'Usuarios encontrado con exito',
            status: 200,
            data: user,
        });
    } catch (error) {
        next(error)
    }
}

export const updateUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

       /*if (updateData.email) {
            const existUser = await Usuario.findOne({ where: { email: updateData.email } });
            if (existUser && existUser.id !== id) {
                throw new ValidationError('El correo electrónico ya esta en uso');
            }
        }*/

            await validateExistData(Usuario, updateData, id);

        const [updateRows, [updateUser]] = await Usuario.update(updateData, {
            where: { id, active: true },
            returning: true,
        });

        if (updateRows === 0) {
            console.error(`No se encontro el usuario con el ID: ${id}`);
        }

        res.status (200).json({
            message: 'Usuario actualizado con exito',
            status: 200,
            data: updateUser,
        });
    } catch (error) {
        next(error)
    }
}