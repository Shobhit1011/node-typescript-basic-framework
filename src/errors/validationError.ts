import { DEFAULT_BAD_REQUEST_ERROR } from "../constants";

export class ValidationError extends Error {
    readonly status: number;
    readonly customCode: string;
    constructor({
        status = DEFAULT_BAD_REQUEST_ERROR.status, 
        message = DEFAULT_BAD_REQUEST_ERROR.message, 
        customCode = DEFAULT_BAD_REQUEST_ERROR.customCode
    }) {
        super(message);
        this.status = status;
        this.customCode = customCode;
    }
}