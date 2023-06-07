import bcrypt from 'bcrypt';

// Hash password
export const hashPassword = async (password: string) : Promise<string> => {
    return await bcrypt.hash(password, 10);
}

// Compare password
export const comparePassword = async (password: string, hash: string) : Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}