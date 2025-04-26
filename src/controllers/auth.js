import { createToken } from "../middleware/token.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

async function Register(req, res) {
    const {  username, email, password } = req.body;
    console.log(`My email is: ${email}`);
    try {

        let newUser = new User({
            username,
            email,
            password,
        });

        let existingUser = await User.findOne({ "email": email })
        
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                message: "An account with this email exists already, try to log in instead."
            });
        }

        // Save user to database
        const savedUser = await newUser.save();
        console.log(`1: ${savedUser}`);
        const { ...user_data } = savedUser;
        
        console.log(`2: ${savedUser}`);
        res.status(200).json({
            status: "success",
            message: "Registration complete."
        });
    } catch (err) {
        console.log("ERR:"+ err);
        res.status(500).json({
            status: "error",
            error: [err],
            message: "Internal Server Error",
        })
    }
    res.end();
}

async function Login(req, res) {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ "email": email });

        if (!user) {
            return res.status(400).json({
                status: "failed",
                userToken: [],
                message: "User does not exist"
            });
        }
        
        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return res.status(400).json({
                status: "failed",
                userToken: [],
                message: "Incorrect password"
            });
        }

        // Check if mfa is enabled for the user
        if (user.mfa?.verified) {
            return res.status(303).json({
                status: "see other",
                message: "2FA Enabled for this account | see GET /auth/mfa/:type"
            });
        }

        res.status(200).json({
            status: "success",
            userToken: createToken(user.email),
            message: "Login successful"
        });
    } catch (err) {
        console.log("ERR:"+ err);
        res.status(500).json({
            status: "error",
            error: [err],
            message: "Internal Server Error",
        })
    };
    res.end();
}

export { Register, Login };