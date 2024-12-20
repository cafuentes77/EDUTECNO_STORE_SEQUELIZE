/** import { Model, DataTypes } from "sequelize";

export class VentasProducto extends Model {}

export const initVentasProducto = (dbConfig) => {
    VentasProducto.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1
                }
            },
            subtotal: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0
                }
            }
        },
        {
            sequelize: dbConfig,
            modelName: "VentasProducto",
            tableName: "ventas_producto",
            timestamps: true
        }
    )
}*/