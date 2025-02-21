import jwt from "jsonwebtoken"

const secret = process.env.TOKEN_SECRET;

const authorizeToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = decoded;
        next();
    });
};

export default authorizeToken;