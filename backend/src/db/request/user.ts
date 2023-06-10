import { User } from '@models/user';
import connectDb from '@db/connect'

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
export const createUser = (firstname: string, lastname: string, avatar: string | null, email: string, password: string, admin: boolean) => {
    connectDb.query("INSERT INTO user (firstname, lastname, avatar, email, password, admin) VALUES (?, ?, ?, ?, ?, ?)", [firstname, lastname, avatar, email, password, admin], (err, result) => {
        if (err)
            throw new Error('Error while creating user');
        else
            return result;
    })
}   