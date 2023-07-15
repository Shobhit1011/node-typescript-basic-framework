import { v4 } from "uuid";
import { UserDTO } from "../dto/userDTO";
import SuccessResponse from "../successResponse";
import { UserModel } from "../db/models";
import { User } from "../db/entities";
import { ConflictError } from "../errors";

export class UserService {
    private userModel: UserModel;

    constructor(userModel?: UserModel) {
        this.userModel = userModel || new UserModel();
    }
    
    public async create(userDTO: UserDTO): Promise<SuccessResponse<User>> {
        const userId: string = v4();
        const isAlreadyExistingUser = await this.userModel.isUserAlreadyExists(userDTO.email, userDTO.phoneNo, userDTO.name);
        if(isAlreadyExistingUser)
            throw new ConflictError({ message: "user already exists with given email, phoneNo or name."});
        const user: User = {
            email: userDTO.email,
            phoneNo: userDTO.phoneNo,
            name: userDTO.name,
            userId
        };
        await this.userModel.create(user);
        const createdUser = await this.userModel.findUserById(userId);
        return new SuccessResponse<User>({}, createdUser);
    }
}