import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { Query } from 'mysql';
import connectDb from './connect'

// Get user by email
export const getUserByEmail = async (email: string): Promise<User> => {
    return await new Promise((resolve, reject) => {
        connectDb.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
            if (err) {
                reject(new Error('Error while getting user by email'));
            } else {
                const user: User = result[0] as User;
                resolve(user);
            }
        });
    });
};

// Create user
export const createUser = (firstname: string, lastname: string, email: string, password: string) => {
    connectDb.query("INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)", [firstname, lastname, email, password], (err, result) => {
        if (err)
            throw new Error('Error while creating user');
        else
            return result;
    })
}   

