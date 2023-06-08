import Food from '../models/food';
import { getAllFoods, getOneFood, addFood, editFood, dropFood } from '../db/request/food';
import { Request, Response } from 'express';

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
    await addFood(req.body)
        .then((food: Food) => {
            res.status(201).json(food);
        })
        .catch((error: Error) => {
            res.status(400).json({ error: error.message });
        })
}

// Update a food
export const updateFood = async (req: Request, res: Response) => {
    await editFood(parseInt(req.params.id), req.body)
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