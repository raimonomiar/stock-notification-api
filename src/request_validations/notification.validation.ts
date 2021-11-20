import joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validateNotification = (request: Request, response: Response, next: NextFunction) => {
    const { body } = request;

    const authSchema = joi.object({
        email: joi.string().email().required(),
        symbol: joi.string().uppercase().required(),
        threshold: joi.number().required()
    });

    const { error } = authSchema.validate(body);

    if (error && error.details) {
        global.logger.log({
            level: "info",
            message: error.message,
            detail: error.details
        });

        response.status(400).send({
            message: "Invalid Body Parameters"
        });
    } else {
        next();
    }
}
