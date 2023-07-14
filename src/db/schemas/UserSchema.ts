import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});