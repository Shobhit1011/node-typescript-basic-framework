import { DEFAULT_NOT_FOUND_ERROR } from "../constants";

export class NotFoundError extends Error {
    readonly status: number;
    readonly customCode: string;
    constructor({
        status = DEFAULT_NOT_FOUND_ERROR.status, 
        message = DEFAULT_NOT_FOUND_ERROR.message, 
        customCode = DEFAULT_NOT_FOUND_ERROR.customCode
    }) {
        super(message);
        this.status = status;
        this.customCode = customCode;
    }
}