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
 * 
 * @apiSuccessExample {json} Success-Response
 *      HTTP/1.1 200 OK
 *      {
 *          "status": 200,
 *           "customCode": "SUCCESS",
 *           "message": "successfully done",
 *           "data": {
 *               "userId": "0e1cda7b-943a-43f7-9a63-d6eb74ced2e0",
 *               "email": "shobhitcoolsinghal@gmail.com",
 *               "name": "Shobhit",
 *               "phoneNo": "9999999990",
 *               "createdAt": "2023-07-15T04:09:26.793Z",
 *               "updatedAt": "2023-07-15T04:09:26.793Z"
 *           }
 *       }
 * @apiError BAD_REQUEST  occurs when validation fails.
 * @apiErrorExample {json} BAD_REQUEST
 *      HTTP/1.1 400 Bad Request
 *      {
 *           "status": 400,
 *           "customCode": "BAD_REQUEST",
 *           "message": {{message}}
 *       }
 * @apiError CONFLICT_ERROR occurs when user already exists with given email, phoneNo or name.
 * @apiErrorExample {json} CONFLICT_ERROR
 *      HTTP/1.1 40 Conflict Error
 *      {
 *          "status": 409,
 *          "customCode": "CONFLICT_ERROR",
 *          "message": "user already exists with given email, phoneNo or name."
 *      }
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