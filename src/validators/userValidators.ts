import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isEmpty } from "lodash";
import { ValidationError } from "../errors/validationError";

export class UserValidators {
    static createUserValidator(req: Request, _: Response, next: NextFunction) {
        const schema = Joi.object({
            email: Joi.string().required().email(),
            phoneNo: Joi.string().required(),
            name: Joi.string().required().pattern(new RegExp(/^[A-Za-z-_]{1,100}$/))
        });
        const { error } = schema.validate(req.body);
        if(!isEmpty(error)) {
            next(new ValidationError({message: error.details[0].message.replace(/"/g, "")}));
        }
        next();
    }
}