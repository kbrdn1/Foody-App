import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

// Extend Express Request interface to add user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

// Load environment variables
config();

// Get secret
const secret: string | undefined = process.env.JWT_SECRET;

// Create token
export const createToken = (user: User) => {
    if (!secret)
        throw new Error('JWT secret is not defined');

    return jwt.sign({ user }, secret, {
        expiresIn: '1d',
    });
}

// Verify token
export const verifyToken = (token: string) => {
    if (!secret)
        throw new Error('JWT secret is not defined');
    
    return jwt.verify(token, secret);
}

// Sign in
export const isAuthentificate = (req: Request, res: Response, next: NextFunction) => {
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

export default {
    createToken,
    verifyToken,
    isAuthentificate
};