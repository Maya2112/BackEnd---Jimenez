import winston from "winston";
import { Router } from "express";

export const router = Router();

let customLevels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
};
export const logger = winston.createLogger({
    levels: customLevels,
    transports: [
    new winston.transports.File({
        level: "error",
        filename: "./src/Logs/errors.log",
        format: winston.format.combine(winston.format.timestamp()),
    }),
    ],
});

const consoleTransport = new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
    winston.format.colorize({
        colors: {
        fatal: "bold white redBG",
        error: "red",
        warning: "yellow",
        info: "blue",
        http: "magenta",
        debug: "green",
        },
    }),
    winston.format.simple()
    ),
});

if (process.env.ENV_MODE.toUpperCase() === "DEV") {
    logger.add(consoleTransport);
}

export const middLogger = (req, res, next) => {
    req.logger = logger;

    next();
};

export const loggerRoute = (req, res) => {
    logger.fatal("Fatal log message");
    logger.error("Error log message");
    logger.warning("Warning log message");
    logger.info("Info log message");
    logger.http("HTTP log message");
    logger.debug("Debug log message");

    return res.json({ message: "Logs generated successfully" });
}