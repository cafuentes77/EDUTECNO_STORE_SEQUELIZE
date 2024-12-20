import { Model, DataTypes } from 'sequelize'
import { dbConfig } from '../config/db.config.js'


export class Producto extends Model{};

export const initProducto = (dbConfig) => {
    Producto.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: { msg: "El nombre del producto no puede ser un campo vacío" },
                len: { 
                    args: [2, 100], 
                    msg: "El nombre del producto debe tener entre 3 y 100 caracteres" }
            }
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        },
    }, 
    {
        sequelize: dbConfig,
        modelName: 'Producto',
        timestamps: true,
        paranoid: true
    }
);

}
