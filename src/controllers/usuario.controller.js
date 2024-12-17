import { where } from "sequelize";
import { Usuario }  from "../models/Usuario.model.js"


export const createUser = async(req, res) => {
    try {
        const user = await Usuario.create(req.body);
        
        console.log(user)
        res.status(201).json({
            message: 'Usuario creado con éxito',
            status: 201,
            data: user,
        });
    } catch (error) {
        console.error(error)
    }
}

export const getAllUsers = async(req, res) => {
    try {
        const users = await Usuario.findAll();

        res.status (200).json({
            message: 'Usuarios encontrados con exito',
            status: 200,
            data: users,
        });
    } catch (error) {
        console.error(error)
    }
}

export const getAllActiveUsers  = async(req, res) => {
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
        console.error(error)
    }
}

export const getUsersByFilters = async(req, res) => {
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
        console.error(error)
    }
}


export const getUserById = async(req, res) => {
    try {
        const { id } = req.params;

        const user = await Usuario.findByPk(id);

        res.status (200).json({
            message: 'Usuarios encontrado con exito',
            status: 200,
            data: user,
        });
    } catch (error) {
        console.error(error)
    }
}

export const getActiveUserById = async(req, res) => {
    try {
        const { id } = req.params;

        const user = await Usuario.findOne(id);
        where : { active: true }

        res.status (200).json({
            message: 'Usuarios encontrado con exito',
            status: 200,
            data: user,
        });
    } catch (error) {
        console.error(error)
    }
}