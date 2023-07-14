import { ErrorRequestHandler} from "express";
import { DEFAULT_SERVER_ERROR } from "./constants";
import { ConflictError, NotFoundError,  ValidationError } from "./errors";

export const errorHandler: ErrorRequestHandler = (error, req, res) => {
    if(error instanceof ConflictError) {
        res.status(409).send({ ...error, message: error.message });
    } else if(error instanceof NotFoundError) {
        res.status(404).send({ ...error, message: error.message });
    }  else if(error instanceof ValidationError) {
        res.status(400).send({ ...error, message: error.message });
    } else {
        console.error(error);
        res.status(500).send(DEFAULT_SERVER_ERROR);
    }
};