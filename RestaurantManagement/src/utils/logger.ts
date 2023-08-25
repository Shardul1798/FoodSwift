import {
    LoggerOptions,
    transports,
    Logger,
    createLogger,
    format
} from 'winston';

import {SERVER} from '../commons/constants'
import { AcceptAny } from '../interfaces/types';

class LoggerUtils {
    private logger: Logger;

    constructor() {
        this.logger = createLogger(this.getConfiguration());
    }

    /**
     * @description Fetch Configuration for Logger
     * @returns {LoggerOptions}
     */
    private getConfiguration(): LoggerOptions {
        let winstonConfig: LoggerOptions = {
            transports: [new transports.Console()],
            format: format.combine(
                format.label({
                    label: 'User-service'
                }),
                format.timestamp({
                    format: 'MMM-DD-YYYY HH:mm:ss'
                }),
                // format.prettyPrint({
                //     colorize: true,
                //     depth: 10
                // }),
                format.colorize({
                    level: true,
                    message: true
                }),
                format.printf(({ level, message, label, timestamp }) => {
                    let logMessage: any = `${timestamp} [${label}] ${level}: ${message}`;

                    if (typeof message === 'object') {
                        logMessage += `\n${JSON.stringify(message, null, 10)}`;
                    }

                    return logMessage;
                })
            ),

            silent: false
        };

        return winstonConfig;
    }

    /**
     * @description Log Level Info
     */
    info(...logs: AcceptAny[]) {
        this.logger.info(logs);
    }

    /**
     * @description Log Level Warn
     */
    warn(...logs: AcceptAny[]) {
        this.logger.warn(logs);
    }

    /**
     * @description Log Level Error
     */
    error(...logs: AcceptAny[]) {
        this.logger.error(logs);
    }
}

export const logger = new LoggerUtils();

export const consolelog = function (
    identifier: string,
    value: any,
    status: boolean = false
) {
    
    try {
        const displayColors = SERVER.DISPLAY_COLOUR;
        if (Array.isArray(value)) {
            value.forEach((obj, i) => {
                if (status) {
                    console.info(
                        displayColors ? '\x1b[31m%s\x1b[0m' : '%s',
                        '<--------------' +
                            identifier +
                            '--------------' +
                            i +
                            '-------------->',
                        obj
                    );
                } else {
                    console.error(
                        displayColors ? '\x1b[31m%s\x1b[0m' : '%s',
                        '<--------------' +
                            identifier +
                            '--------------' +
                            i +
                            '-------------->',
                        obj
                    );
                }
            });
            return;
        } else {
            if (status) {
                console.info(
                    displayColors ? '\x1b[31m%s\x1b[0m' : '%s',
                    '<--------------' + identifier + '-------------->',
                    value
                );
            } else {
                console.error(
                    displayColors ? '\x1b[31m%s\x1b[0m' : '%s',
                    '<--------------' + identifier + '-------------->',
                    value
                );
            }
            return;
        }
    } catch (error) {
        return;
    }
};