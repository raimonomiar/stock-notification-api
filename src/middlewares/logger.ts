import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = function (request: Request, response: Response, next: NextFunction) {
    const message = `[${request.method}] url->${request.url} ip->${request.ip} body->${JSON.stringify(request.body)}`;
    
    if (process.env.NODE_ENV !== 'production') {
        global.logger.log({
            level: "info",
            message,
            skip: true
        });        
    }
    
    next();
}

