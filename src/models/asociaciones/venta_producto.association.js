import { Venta } from "../Venta.model.js";
import { Producto } from "../Producto.model.js";


// caso de muchos es a muchos
export const setupVentaProducto = () => {
    Venta.belongsToMany(Producto, {
        through: 'VentaProductos',
        foreignKey: 'ventaId',
        otherKey: 'productoId',
        as: 'productos'
    });

    Producto.belongsToMany(Venta, {
        through: 'VentaProductos',
        foreignKey: 'productoId',
        otherKey: 'ventaId',
        as: 'ventas'
    });
}