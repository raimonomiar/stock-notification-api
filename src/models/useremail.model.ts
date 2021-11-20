import { Model, Sequelize, DataTypes } from "sequelize";

export class UserEmail extends Model {

}

export function userEmail(sequelize: Sequelize) {
    UserEmail.init({
        useremailid: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        guid: {
            type: DataTypes.UUID
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: "useremails"
    });
}