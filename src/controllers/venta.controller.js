import { dbconfig } from  '../config/db.config.js'
import { ValidationError } from '../errors/TypeError.js';
import { Usuario } from '../models/Usuario.model.js';
import { isValidDate, notFoundDataRequest } from '../utils/validations/Validate.js';


export const createVentaConProductos = async (req, res, next) => {
    const transaction = await dbconfig.transaction() // esto ya inicio el BEGIN  de la transaccion
    try {

        // id del usuario - 1 a muchos -> 1 solo dato
        //objetos productos -> array de objetos
            // id del producto - muchos a muchos -> array de datos
            // precio de cada producto - muchos -> array de datos
            // cantidad de cada producto - muchos -> array de datos

        // fecha de la venta -> puede o no puede estar , si no esta es un NOW

        // total de la venta -> calculable

        //1. guardamos los datos de la REQUEST
        const { usuarioId, productos, fecha } = req.body;

        //2. validamos que llegue la request
        isEmptyData(usuarioId, 'ID del usuario'); //este valida que llegó un ID desde la request
        isEmptyData(productos, 'Productos');

        //3. validamos que el usuario exista
        await notFoundDataRequest(Usuario, usuarioId); // este valida que el usuario existe con este ID

        //4. confirmamos los productos 4.5 podemos sacar el total y el subtotal
        let total = 0;
        for(const producto of productos){
            if(!producto.id || !producto.cantidad || producto.cantidad <= 0) {
                throw new ValidationError('Los productos deben tener un productoId y cantidad mayor a 0');
            }

            await notFoundDataRequest(Producto, producto.id);
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;
        }

        //5. verifiacr si se mando la fecha , sino mandar la actual
        fecha = isValidDate(fecha);

        await transaction.commit()
    } catch (error) {
        await transaction.rollback()
        next(error)
    }
}

