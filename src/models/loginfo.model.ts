import { Model, Sequelize, DataTypes } from "sequelize";

export class LogInfo extends Model {

}

export function logInfo(sequelize: Sequelize) {
    LogInfo.init({
        loginfoid: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        guid: {
            type: DataTypes.UUID
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        additionaldetails: {
            type: DataTypes.TEXT
        },
        severity: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        processname: {
            type: DataTypes.STRING
        },
        createdat: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: "loginfo"
    });
}