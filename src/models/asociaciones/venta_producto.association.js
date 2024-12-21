import { Venta } from "../Venta.model.js";
import { Producto } from "../Producto.model.js";
import { VentasProductos } from "../VentaProducto.model.js";


// caso de muchos es a muchos
export const setupVentaProducto = () => {
    Venta.belongsToMany(Producto, {
        through: VentasProductos,
        foreignKey: 'ventaId',
        otherKey: 'productoId',
        as: 'productos'
    });

    Producto.belongsToMany(Venta, {
        through: VentasProductos,
        foreignKey: 'productoId',
        otherKey: 'ventaId',
        as: 'ventas'
    });
}