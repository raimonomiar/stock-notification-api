import { Router, Request, Response, NextFunction } from "express";
import { NotificationService, StockThresholdService } from "../services";
import { IController } from "../shared/interfaces";
import { validateNotification } from "../request_validations";

export class NotificationController implements IController {
    public router: Router;
    public route: string = 'notifications';

    constructor(private notificationService: NotificationService, private stockThresholdService: StockThresholdService) {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post("/", [validateNotification], this.create);
        this.router.delete("/", [validateNotification], this.delete);
    }

    create = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email, symbol, threshold } = request.body;
            const emailUser = await this.notificationService.add({ email });
        
            
            await this.stockThresholdService.add({ symbol, threshold, useremailid: emailUser.getDataValue('useremailid')});

            response.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    delete = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email, symbol, threshold } = request.body;
            const emailUser = await this.notificationService.find(email);
            if (emailUser === undefined) {
                return response.status(404).send({ message: "User email not found" });
            }

            const stockThreshold = await this.stockThresholdService.delete({ symbol, threshold, useremailid: emailUser.getDataValue('useremailid') });

            if (stockThreshold == null) {
                return response.status(404).send({ message: "Symbol not found" });
            }

            response.status(204).send();
        } catch (error) {
            next(error);
        }
    }

}