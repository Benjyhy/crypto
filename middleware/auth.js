import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            req.userId = userId;
            next();
        }
    } catch {
        res.status(401).json({ error: new Error('Invalid request') });
    }
}

export default Auth;