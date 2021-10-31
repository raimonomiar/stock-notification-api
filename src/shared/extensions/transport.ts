import Transport from "winston-transport";
import { LogInfo } from "../../models"

export class DatabaseTransport extends Transport {
    constructor() {
        super()
    }

    log(info: any, callback: any) {

        const logInfo = {
            message: info.message == undefined ? "" : info.message,
            additionaldetails: info.detail == undefined ? "" : typeof info.detail === 'object' ? JSON.stringify(info.detail) :  info.detail,
            severity: info.level === "error" ? "E" : info.level === "info" ? "I" : "D",
            processname: "API"
        }
        console.log(logInfo);
        setImmediate(() => {
            if (!info.skip) {
                LogInfo.create(logInfo);
            }
            this.emit('logged', info);
        });

        // Perform the writing to the remote service

        callback();
    }
}