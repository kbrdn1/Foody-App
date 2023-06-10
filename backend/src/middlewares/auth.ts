import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User, UserRes } from '@models/user';
import { Request, Response, NextFunction } from 'express';

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
export const createToken = (user: UserRes) => {
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

// Decode token
export const decodeToken = (token: string) => {
    if (!secret)
        throw new Error('JWT secret is not defined');
    
    return jwt.decode(token);
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

// isAdmin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Access denied' });
    
    if (!verifyToken(token))
        return res.status(401).json({ error: 'Access denied' });
    
    const decodedToken = decodeToken(token);
    if (!decodedToken)
        return res.status(401).json({ error: 'Access denied' });
    
    const user = JSON.parse(JSON.stringify(decodedToken)).user;
    
    if (!user.admin)
        return res.status(401).json({ error: 'Access denied' });
    
    next();
}

export const isOwnnerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Access denied' });
    
    if (!verifyToken(token))
        return res.status(401).json({ error: 'Access denied' });
    
    const decodedToken = decodeToken(token);
    if (!decodedToken)
        return res.status(401).json({ error: 'Access denied' });
    
    const user = JSON.parse(JSON.stringify(decodedToken)).user;
    
    if (req.params.userId != user.id && !user.admin)
        return res.status(401).json({ error: 'Access denied' });
    
    next();
}