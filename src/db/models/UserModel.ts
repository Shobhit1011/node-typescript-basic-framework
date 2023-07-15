import { User } from "../entities";
import { UserSchema } from "../schemas";
import { BaseModel } from "./baseModel";
import { isEmpty } from "lodash";

export class UserModel extends BaseModel<User> {
    constructor() {
        super("user", UserSchema);
    }

    async findUserById(userId: string): Promise<User | null> {
        return await this.findOne({ userId });
    }

    async isUserAlreadyExists(email: string, phoneNo: string, name: string): Promise<boolean | null> {
        const user = await this.findOne({ $or: [ { email }, { name }, { phoneNo } ]});
        if(isEmpty(user)) return false;
        return true;
    }
}