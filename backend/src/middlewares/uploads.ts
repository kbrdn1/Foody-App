import multer, { StorageEngine } from 'multer';
import { Request, Response, NextFunction } from 'express';

// Upload image for food
const storageFood: StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, 'foods/')
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const food = JSON.parse(req.body.food);
        const extension = file.originalname.split('.').pop();
        const newFileName = `${food.name}.${extension}`;
        cb(null, newFileName)
    }
});

export const uploadFood = (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({ storage: storageFood }).single('file');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        next();
    })
}

// Upload user avatar
const storageUser: StorageEngine = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, 'uploads/users/')
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const user = JSON.parse(req.body.user);
        const extension = file.originalname.split('.').pop();
        const newFileName = `${user.id}.${extension}`;
        cb(null, newFileName)
    }
});

export const uploadUser = (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({ storage: storageUser }).single('file');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        next();
    })
}
