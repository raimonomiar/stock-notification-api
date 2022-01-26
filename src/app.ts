import Express, { Application, Request, Response } from "express";
import { IApplicationOptions, IDatabaseConnectionOptions } from "./shared/interfaces";
import { sequelize } from "./models";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error";
export default class App {
    private app: Application;
    port: number;

    constructor({ controllers, middlewares, port, }: IApplicationOptions) {
        this.app = Express();
        this.port = port;

        this.middlewares(middlewares);

        this.createDatabaseConnection({
            database: process.env.DB_DATABASE,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10)
        });

        this.initRoutes(controllers);
    }

    async createDatabaseConnection(connOptions: IDatabaseConnectionOptions) {
        try {
            
        await sequelize(connOptions);
            
        } catch (error) {
            global.logger.log({
                level: "error",
                message: "Error connecting to database",
                detail: error.message
            })
        }
    }

    middlewares(middlewares: any[]) {

        // if (['production'].indexOf(process.env.NODE_ENV) !== -1) {
        //     const whiteList: string[] = process.env.CORS_DOMAINS.split(',');

        //     const corsOptions = {
        //         origin: (origin: string, callback: any) => {
        //             if (!origin) return callback(null, true);
        //             if (whiteList.indexOf(origin) !== -1) {
        //                 callback(null, true)
        //             } else {
        //                 callback(new Error('Domain is not valid'))
        //             }
        //         }
        //     }

        //     this.app.use(cors(corsOptions));
        // } else {
        //     this.app.use(cors());
        // }

        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
        this.app.disable('x-powered-by');
    }

    initRoutes(controllers: any[]) {
        this.app.get('/', (request: Request, response: Response) => {
            response.json({
                status: 'UP'
            });
        });
        
        controllers.forEach(controller => {
            this.app.use(`/${controller.route}`, controller.router);
        });

        this.app.use(errorMiddleware);
    }

    run(cb: () => void) {
        this.app.listen(this.port, cb);
    }
}
