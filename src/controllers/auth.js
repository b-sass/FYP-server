import { createToken } from "../middleware/token.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

async function Register(req, res) {
    const {  username, email, password } = req.body;
    console.log(`My email is: ${email}`);
    try {

        if (!username || !email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all required fields. [username, email, password]"
            });
        }

        if (username.length < 5) {
            return res.status(400).json({
                status: "failed",
                message: "Username must be at least 5 characters long."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                status: "failed",
                message: "Password must be at least 8 characters long."
            });
        }

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

        existingUser = await User.findOne({ "username": username })
        
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                message: "An account with this username exists already, please pick a different username."
            });
        }

        // Save user to database
        const savedUser = await newUser.save();
        const { ...user_data } = savedUser;
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
        console.log(`My email is: ${email}`);
        console.log(`My password is: ${password}`);

        let user = await User.findOne({ "email": email });

        if (!user) {
            return res.status(400).json({
                status: "failed",
                userToken: [],
                message: "User does not exist"
            });
        }

        console.log(`password: ${password}`);
        console.log(`password hash: ${user.password}`);
        // Compare passwords
        const match = bcrypt.compare(password, user.password);
        
        console.log(`match: ${match}`);
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
                message: "2FA Enabled for this account | see GET /auth/mfa"
            });
        }

        res.status(200).json({
            status: "success",
            userToken: createToken(user.username, user.email),
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