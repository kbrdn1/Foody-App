import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

// Load environment variables
config();

// Get secret
const secret: string | undefined = process.env.JWT_SECRET;

// Create token
export const createToken = (user: any) => {
    if (!secret)
        return null;

    return jwt.sign({ user }, secret, {
        expiresIn: '1d',
    });
}

// Verify token
export const verifyToken = (token: string) => {
    if (!secret)
        return null;
    
    return jwt.verify(token, secret);
}

export const signIn = (req: any, res: any, next: any) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = verifyToken(token);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
}  

module.exports = signIn;