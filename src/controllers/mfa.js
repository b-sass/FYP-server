import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as mfa from "../middleware/mfa.js";
import User from "../models/User.js";
import { createToken } from "../middleware/token.js";

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const Setup2FA = async (req, res) => { 
    // get user
    try {
        let user = await User.findOne({ email: req.email });

        // check if user has mfa enabled
        console.log(`user: ${user}`);
        if (user.mfa?.verified) {
            console.log("User already has MFA enabled");
            return res.status(422).json({ message: "MFA already enabled" });
        }
        // generate secret
        let secret = mfa.generateKey();
        // convert to base32
        let base32 = mfa.hexToBase32(secret);
        // update user object in database with secret
        user.mfa = {
            secret: base32,
            verified: false
        };

        try {
            await user.save();
            return res.status(201).json({ message: "MFA secret saved", secret: base32 });
        } catch(err) {
            console.log(err);
            return res.status(422).json({ message: "Error saving MFA secret" });
        }
    } catch (err) {
        console.log("ERR:"+ err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const Verify2FA = async (req, res) => {
    // Extract token and credentials from the request
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader && tokenHeader.split(" ")[1];
    const { email, password, code } = req.body;

    try {
        let user;

        if (token) {
            // Verify the JWT token
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "Invalid or expired token" });
                }
                // Fetch user based on decoded token
                user = await User.findOne({ email: decoded.email })

                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                if (!code) {
                    return res.status(401).json({ message: "Missing MFA code." })
                }

                if(user.mfa?.verified) {
                    return res.status(422).json({ message: "MFA already verified" });
                }

                // Proceed to validate MFA
                validateMFA(user, code, res, token);
            });
        } else {
            // Ensure both `email` and `password` are provided
            if (!email || !password) {
                return res.status(400).json({ message: "User credentials are required" });
            }

            // Fetch user based on credentials
            user = await User.findOne({ email: email })

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Verify the password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Proceed to validate MFA
            validateMFA(user, code, res);
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

/**
 * Validates the MFA code and updates the user's MFA status if valid.
 * @param {Object} user - The user object.
 * @param {string} code - The MFA code to validate.
 * @param {Response} res - The response object.
 */
const validateMFA = async (user, code, res, token = null) => {
    if (!user.mfa) {
        return res.status(422).json({ message: "MFA not enabled" });
    }

    console.log(`"Verify" secret: ${user.mfa.secret}`);
    console.log(`"Verify" userToken: ${code}`);

    // Validate the MFA code
    const valid = mfa.confirm(code, user.mfa.secret);
    if (!valid) {
        return res.status(422).json({ message: "Invalid 2FA code" });
    }

    // Update MFA verification status if not already verified
    if (!user.mfa.verified) {
        user.mfa.verified = true;
        try {
            await user.save();
        } catch (err) {
            console.error(err);
            return res.status(422).json({ message: "Error saving MFA status" });
        }
    }

    // Return success response
    res.status(200).json({
        status: "success",
        userToken: token || createToken(user.email),
        message: "MFA verified and login successful",
    });
};

export { Setup2FA, Verify2FA };