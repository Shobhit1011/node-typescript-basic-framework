class SuccessResponse<T> {
    readonly status: number;
    readonly customCode: string;
    readonly message: string;
    readonly data?: T;

    constructor({status = 200, customCode = "SUCCESS", message = "successfully done"}, data: T | null) {
        this.status = status;
        this.customCode = customCode;
        this.message = message;
        this.data = data !== null ? data: undefined;
    }
}

export default SuccessResponse;
