import { DEFAULT_CONFLICT_ERROR } from "../constants";

export class ConflictError extends Error {
    readonly status: number;
    readonly customCode: string;
    constructor({
        status = DEFAULT_CONFLICT_ERROR.status, 
        message = DEFAULT_CONFLICT_ERROR.message, 
        customCode = DEFAULT_CONFLICT_ERROR.customCode
    }) {
        super(message);
        this.status = status;
        this.customCode = customCode;
    }
}