import Food from '@models/food';
import { getAllFoods, getOneFood, addFood, editFood, patchOneFood, dropFood, searchFoods } from '@db/request/food';
import { Request, Response } from 'express';
interface MulterRequest extends Request {
  file: any;
}

// Get all foods
export const getFoods = async (req: Request, res: Response) => {
    await getAllFoods()
        .then((foods: Food[]) => {
            res.status(200).json(foods);
        })
        .catch((error: Error) => {
            res.status(400).json({ error: error.message });
        });
};

// Get a food
export const getFood = async (req: Request, res: Response) => {
    await getOneFood(parseInt(req.params.id))
        .then((food: Food) => {
            res.status(200).json(food);
        })
        .catch((error: Error) => {
            res.status(400).json({ error: error.message });
        });
}

// Create a food
export const createFood = async (req: Request, res: Response) => {
    let formData = JSON.parse(req.body.food);
    if (req.file)
        formData.img = req.file.filename;
    
    await addFood(formData)
        .then((food: Food) => {
            res.status(201).json(food);
        })
        .catch((error: Error) => {
            res.status(400).json({ error: error.message });
        })
}

// Update a food
export const updateFood = async (req: Request, res: Response) => {
    let formData = JSON.parse(req.body.food);
    if (req.file)
        formData.img = req.file.filename;
    
    await editFood(parseInt(req.params.id), formData)
        .then((food: Food) => {
            res.status(200).json(food);
        })
        .catch((error: Error) => {
            res.status(400).json({ error: error.message });
        })
}

// Patch a food
export const patchFood = async (req: Request, res: Response) => {
    const food: Food = req.body;
    await patchOneFood(parseInt(req.params.id), food)
        .then((food: Food) => {
            res.status(200).json(food);
        })
        .catch((error: Error) => {
            res.status(400).json({ error: error.message });
        })
}

// Delete a food
export const deleteFood = async (req: Request, res: Response) => {
    await dropFood(parseInt(req.params.id))
        .then((food: Food) => {
            res.status(200).json('Food n°' + req.params.id + ' deleted');
        })
        .catch((error: Error) => {
            res.status(400).json({ error: error.message });
        })
}

// Search a food
export const searchFoodsByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    await getAllFoods()
        .then((foods: Food[]) => {
            let results: Food[] = [];
            foods.forEach(food => {
                if (food.name.toLowerCase().includes(name.toLowerCase()))
                    results.push(food);
            });
            res.status(200).json(results);
        })
        .catch((error: Error) => {
            res.status(400).json({ error: error.message });
        })
}