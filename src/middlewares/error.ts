import { Request, Response, NextFunction } from "express";
import HttpException from "../shared/exceptions/httpExceptions";

export const errorMiddleware = function (error: any, request: Request, response: Response, Next: NextFunction) {
    error = new HttpException({
        statusCode: 500,
        description: error.message
    });
    const parsedError = error.parse();
    response.status(parsedError.statusCode).json(parsedError);
}