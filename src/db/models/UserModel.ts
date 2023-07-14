import { User } from "../entities";
import { UserSchema } from "../schemas";
import { BaseModel } from "./baseModel";

export class UserModel extends BaseModel<User> {
    constructor() {
        super("user", UserSchema);
    }

    async findUserById(userId: string): Promise<User | null> {
        return this.findOne({ userId });
    }

    async isUserAlreadyExists(email: string, name: string, phoneNo: string): Promise<User | null> {
        return this.findOne({ $or: [ { email }, { name }, { phoneNo } ]});
    }
}