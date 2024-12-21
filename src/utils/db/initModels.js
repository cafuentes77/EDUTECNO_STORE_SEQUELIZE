import { dbConfig } from "../../config/db.config.js";
import { DataBaseError } from "../../errors/TypeError.js";
import { initProducto } from "../../models/Producto.model.js";
import { initUsuario } from "../../models/Usuario.model.js"
import { initVenta } from "../../models/Venta.model.js";
import { initVentasProductos } from "../../models/VentaProducto.model.js";

export const initModels = (config) => {
    try {
        initUsuario(config);
        initProducto(config);
        initVenta(config);
        initVentasProductos(dbConfig);
    } catch (error) {
        console.error(error)
        throw new DataBaseError('Error al iniicializar los modelos')
    }
}