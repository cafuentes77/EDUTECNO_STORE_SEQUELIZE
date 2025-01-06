import { NotFoundError } from "../errors/TypeError.js";
import { Producto } from "../models/Producto.model.js"
import { isEmptyResponseData } from "../utils/validations/Validate.js";

// API RESTFULL
// REST -> ARQUITECTURA DE DISEÑO PARA SERVICIOS WEB - ROY FIELDING
// REPRESENT STATE TRANSFER
/* 
1. separa responsbilidad  -> cliente y servidor -> cliente solicita - servidor provee o almacena
2. stateless (sin estado) -> cada peticions del cliente al servidor debe ser STATELESS (no habrá cambios en el estado hasta que el proceso termine)
3. interfaz uniforme -> las respuestas deben contener una estructura homogenea, al igual que los endpoints para cada petición
4. cacheable -> las respuestas y las peticiones deben ser almacenadas en cache (espacio de memoria temporal) para mejorar rendimiento y escalabilidad
5. uso representacional, el cliente y el servidor se comunican a través de representaciones de recursos (JSON, XML, HTML)
6. sistema en capas -> el cliente no necesita saber la estructura de la base de datos, solo necesita saber la estructura de los recursos(balanceadores de carga, servidores, proxies, gateways)
*/

export const createProduct = async (req, res, next) => {
    try {
        const product = await Producto.create(req.body)

        res.status(201).json({
            message: 'Producto creado con éxito',
            status: 201,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Producto.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        isEmptyResponseData(products);

        res.status(200).json({
            message: "Productos encontrados con éxito",
            status: 200,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};


export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Producto.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        isEmptyResponseData(product);

        res.status(200).json({
            message: "Producto encontrado con éxito",
            status: 200,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};


export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [updateRows, [updatedProduct]] = await Producto.update(req.body, {
            where: { id },
            returning: true,
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        if (updateRows === 0) {
            throw new NotFoundError(
                `No se encontró el producto con ID: ${id} para actualizar`
            );
        }

        res.status(200).json({
            message: "Producto actualizado con éxito",
            status: 200,
            data: updatedProduct,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Producto.destroy({ where: { id } });

        res.status(200).json({
            message: "Producto eliminado con éxito",
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};