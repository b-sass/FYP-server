import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        require: true,
    },
    password: {
        type: String,
        minLength: 8,
        lowercase: true,
        require: true,
    },
});

export default userSchema;