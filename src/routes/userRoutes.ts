import { Router, Request, Response, NextFunction } from "express";
import * as core from "express-serve-static-core";
import SuccessResponse from "../successResponse";
import { UserService } from "../services";
import { User } from "../db/entities";
import { UserValidators } from "../validators";

const router: core.Router = Router();

/**
 * @api {post} /users Create User
 * @apiName Create User
 * @apiGroup User
 *
 * @apiBody {String} email User email.
 * @apiBody {String} phoneNo User phoneNo.
 * @apiBody {String} name User name.
 * 
 * @apiSuccess {Number} status Response status.
 * @apiSuccess {String} customCode Response customCode.
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} data User Info.
 * @apiSuccess {String} data.userId User's userId.
 * @apiSuccess {String} data.email User email.
 * @apiSuccess {String} data.phoneNo User phoneNo.
 * @apiSuccess {String} data.name User name.
 * @apiSuccess {Date} data.createdAt User created date.
 * @apiSuccess {Date} data.updatedAt User updated date.
 */
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