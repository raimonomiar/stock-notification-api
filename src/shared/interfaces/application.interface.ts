import { Sequelize } from "sequelize";

export interface IApplicationOptions {
    controllers: any[];
    middlewares: any[];
    port: number,
    sequelize: Sequelize
}
