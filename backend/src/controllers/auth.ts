import { getUserByEmail, createUser } from '../db/request';
import { comparePassword, hashPassword } from '../utils';
import { Request, Response } from 'express';
import { createToken } from '../middlewares/auth';
import { User } from '../models/user';

// Login
export const login = async (req: Request, res: Response) => {
    req.body = JSON.parse(req.body);

    const { email, password } = req.body,
        user: User = await getUserByEmail(email);

    if (user === undefined)
        return res.status(400).json({ error: 'Email does not exist' });
    
    const isPasswordValid: boolean = await comparePassword(password, user.password);

    if (!isPasswordValid)
        return res.status(400).json({ error: 'Invalid password' });
    
    const token = createToken(user);

    return res.status(200).json({ message: 'User logged in successfully', token });
}

// Register
export const register = async (req: Request, res: Response) => {
    req.body = JSON.parse(req.body);

    const { firstname, lastname, email, password } = req.body;

    if (getUserByEmail(email) !== undefined)
        return res.status(400).json({ error: 'Email already exists' });
    
    const hashedPassword: string = await hashPassword(password);

    createUser(firstname, lastname, email, hashedPassword);

    return res.status(200).json({ message: 'User created successfully' });
}

export default {
    login,
    register
};