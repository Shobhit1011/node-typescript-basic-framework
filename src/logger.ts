import { createLogger, transports, format, Logger } from "winston";

export const logger: Logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    )
});