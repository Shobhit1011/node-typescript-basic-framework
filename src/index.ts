import express, { Express, NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import path from "path";
import { logger } from "./logger";
dotenv.config();
import config from "./config";
import { errorHandler } from "./errorHandler";
import UserRoutes from "./routes/userRoutes";
import { NotFoundError } from "./errors";

console.log = (...args) => { logger.info(args); };
console.error = (...args) => { logger.error(args); };
console.warn = (...args) => { logger.warn(args); };

const app: Express = express();

// connecting mongoDB.
const { connectionURI, name } = config.get('db');
mongoose.connect(connectionURI, { appName: "logger", dbName: name }).then(() => {
    logger.info("connected to mongodb successfully");
});

app.listen(config.get('port'), () => {
    logger.info(`app started at port ${config.get('port')}`);
});

// request body parsing.
app.use(bodyParser.json());
// apidocs.
app.use("/apidocs", express.static(path.join(__dirname, 'docs')));
app.use("/users", UserRoutes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((_req: Request, _res: Response, _next: NextFunction) => {
    throw new NotFoundError({});
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    errorHandler(error, req, res, next);
});
