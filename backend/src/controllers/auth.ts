import { getUserByEmail, createUser } from '../db/request';
import { comparePassword, hashPassword } from '../utils';
import { Request, Response } from 'express';
import { createToken } from '../middlewares/auth';
import { User, UserRes } from '../models/user';
import { get } from 'http';

// Login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body,
        user: User = await getUserByEmail(email);

    if (user === undefined)
        return res.status(400).json({ error: 'Email does not exist' });
    
    const isPasswordValid: boolean = await comparePassword(password, user.password);

    if (!isPasswordValid)
        return res.status(400).json({ error: 'Invalid password' });
    
    const token = createToken(user);

    //delete user.password
    const userRes: UserRes = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        email: user.email,
        admin: user.admin
    };

    return res.status(200).json({ message: 'User logged in successfully !', token, user: userRes });
}

// Register
export const register = async (req: Request, res: Response) => {
    const { firstname, lastname, email, password } = req.body,
        admin: boolean = false,
        avatar: null = null,
        user: User = await getUserByEmail(email);

    if (user !== undefined)
        return res.status(400).json({ error: 'Email already exists' });
    
    const hashedPassword: string = await hashPassword(password);

    createUser(firstname, lastname, avatar, email, hashedPassword, admin);

    return res.status(200).json({ message: 'User created successfully !' });
}

export default {
    login,
    register
};