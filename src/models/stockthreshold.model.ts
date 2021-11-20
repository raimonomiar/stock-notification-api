import { Model, Sequelize, DataTypes } from "sequelize";

export class StockThreshold extends Model {

}

export function stockThreshold(sequelize: Sequelize) {
    StockThreshold.init({
        stockthresholdid: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        guid: {
            type: DataTypes.UUID
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        threshold: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        useremailid: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        deletedat: {
            type: DataTypes.DATE
        }    
    }, {
        sequelize,
        timestamps: false,
        tableName: "stockthreshold"
    });
}