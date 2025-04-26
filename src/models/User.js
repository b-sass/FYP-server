import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const mfa = new Schema({
    secret: {
        type: String,
        default: "",
    },
    verified: {
        type: Boolean,
        default: false,
    },
});


const userSchema = new Schema({
    username: {
        type: String,
        minLength: 5,
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
    mfa: {
        type: mfa,
    },
});

// Password hashing
userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

export default model("User", userSchema);