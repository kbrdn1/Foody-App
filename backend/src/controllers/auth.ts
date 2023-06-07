import { Request, Response } from 'express';

// Login
export const login = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Login' });
    // req.body = JSON.parse(req.body.data);

    // const { email, password } = req.body;

    // if (!email || !password)
    //     return res.status(400).json({ error: 'Please fill all fields' });

    // try {
    //     // Check if user exists
        
    //     // Check if password is correct
        
    //     // Create and assign token
        
    // }
    // catch (err) {
    //     res.status(400).json({ error: err.message });
    // }

}

// Register
export const register = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Register' });
    // req.body = JSON.parse(req.body.data);

    // const { name, email, password } = req.body;

    // if (!name || !email || !password)
    //     return res.status(400).json({ error: 'Please fill all fields' });

    // try {
    //     // Check if user exists
        
    //     // Hash password
        
    //     // Create user
        
    //     // Create and assign token
        
    // }
    // catch (err) {
    //     res.status(400).json({ error: err.message });
    // }
}