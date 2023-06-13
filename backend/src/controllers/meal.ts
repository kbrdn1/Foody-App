import { Request, Response } from 'express';
import Meal from '@models/meal';
import { getAllMeals, getOneMealById, addMeal, editMeal, dropMeal, getAllMealByUserId, getAllMealByDateAndUserId, getAllMealByDateAndUserIdAndCategoryId, getAllMealUserIdAndCategoryId } from '@db/request/meal';

export const getMeal = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    await getAllMeals(userId)
        .then((meals: Meal[]) => {
            res.status(200).json(meals)
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })
}

export const getMealById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    await getOneMealById(id)
        .then((meal: Meal) => {
            res.status(200).json(meal)
        })
        .catch((error: Error) => {
            res.status(500).json({ error: error.message})
        })
}

export const createMeal = async (req: Request, res: Response) => {
    await addMeal(req.body)
        .then((meal: Meal) => {
            res.status(201).json(meal)
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })
}

export const updateMeal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    await editMeal(id, req.body)
        .then((meal: Meal) => {
            res.status(200).json(meal)
        })
        .catch((error: Error) => {
            res.status(500).json({ error: error.message})
        })
}

export const deleteMeal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    await dropMeal(id)
        .then((meal: Meal) => {
            res.status(200).json(meal)
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })
}

export const getMealByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    await getAllMealByUserId(userId)
        .then((meals: Meal[]) => {
            res.status(200).json(meals)
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })
}

export const getMealByDateAndUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    const date = req.params.date
    await getAllMealByDateAndUserId(date, userId)
        .then((meals: Meal[]) => {
            res.status(200).json(meals)
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })
}   

export const getMealByDateAndUserIdAndCategoryId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    const categoryId = parseInt(req.params.categoryId)
    const date = req.params.date
    await getAllMealByDateAndUserIdAndCategoryId(date, userId, categoryId)
        .then((meals: Meal[]) => {
        res.status(200).json(meals)
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })
}

export const getMealByUserIdAndCategoryId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    const categoryId = parseInt(req.params.categoryId)
    await getAllMealUserIdAndCategoryId(userId, categoryId)
        .then((meals: Meal[]) => {
        res.status(200).json(meals)
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message})
        })
}