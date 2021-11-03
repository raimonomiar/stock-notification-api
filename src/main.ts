import { config } from "dotenv";
import { resolve } from "path";
import helmet from "helmet";
import App from "./app";
import logger from "./shared/logger";
import { urlencoded, json } from "express";
import { loggerMiddleware } from "./middlewares";
import { Sequelize } from "sequelize";
import { NotificationController } from "./controllers";
import { StockThresholdService, NotificationService } from "./services";

declare global {
    namespace NodeJS {
        interface Global {
            [key: string]: any
        }
    }
}

const environment = process.env.NODE_ENV;
const { error } = config({
    path: resolve(__dirname, '../', `.env.${environment}`)
});

if (error) {
    throw new Error(error.message);
}

global.logger = logger;
let sequelize:Sequelize = null;

const app = new App({
    controllers: [
        new NotificationController(
            new NotificationService(),
            new StockThresholdService
        )

    ],
    middlewares: [
        helmet(),
        urlencoded({
            extended: true
        }),
        json(),
        loggerMiddleware
    ],
    port: Number(process.env.APP_PORT),
    sequelize
});

app.run( () => {
    global.logger.log({
        level: 'info',
        message: `Server running in ${environment} mode`,
        skip: true
    });
})
