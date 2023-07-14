import { Router, Request, Response, NextFunction } from "express";
import * as core from "express-serve-static-core";
import SuccessResponse from "../successResponse";
import { UserService } from "../services";
import { User } from "../db/entities";
import { UserValidators } from "../validators";

const router: core.Router = Router();

router.post("/", UserValidators.createUserValidator ,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _inst = new UserService();
        const response: SuccessResponse<User> = await _inst.create(req.body);
        res.status(200).send(response);
    } catch(error) {
        next(error);
    }
});

export default router;