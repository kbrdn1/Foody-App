import Meal from '@models/meal'
import connectDb from '@db/connect'

// Get all meals
export const getAllMeals = async (userId: number): Promise<Meal[]> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`SELECT * FROM meal`, (err, result) => {
            if (err) {
                reject(new Error('Error while getting meals'));
            } else {
                const meals: Meal[] = result as Meal[];
                resolve(meals);
            }
        });
    });
}

// Get meal by id
export const getOneMealById = async (id: number): Promise<Meal> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`SELECT * FROM meal WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(new Error('Error while getting meal'));
            } else {
                const meal: Meal = result[0] as Meal;
                resolve(meal);
            }
        });
    });
}

// Create meal
export const addMeal = async (meal: Meal): Promise<Meal> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`INSERT INTO meal (userId, foods, date, categoryId) VALUES (${meal.userId}, '[${meal.foods}]', '${meal.date}', ${meal.categoryId})`, (err, result) => {
            if (err) {
                reject(new Error('Error while creating meal'));
            } else {
               
                resolve(meal);
            }
        });
    });
}

// Update meal
export const editMeal = async (id: number, meal: Meal): Promise<Meal> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`UPDATE meal SET name = '${meal.name}', foods = ${meal.foods} WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(new Error('Error while updating meal'));
            } else {
                const meal: Meal = result[0] as Meal;
                resolve(meal);
            }
        });
    });
}

// Delete meal
export const dropMeal = async (id: number): Promise<Meal> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`DELETE FROM meal WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(new Error('Error while deleting meal'));
            } else {
                const meal: Meal = result[0] as Meal;
                resolve(meal);
            }
        });
    });
}

// Get meal by user id
export const getAllMealByUserId = async (userId: number): Promise<Meal[]> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`SELECT * FROM meal WHERE userId = ${userId}`, (err, result) => {
            if (err) {
                reject(new Error('Error while getting meal'));
            } else {
                const meals: Meal[] = result[0] as Meal[];
                resolve(meals);
            }
        });
    });
}

// Get meal by date and user id
export const getAllMealByDateAndUserId = async (date: string, userId: number): Promise<Meal[]> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`SELECT * FROM meal WHERE date = '${date}' AND userId = ${userId}`, (err, result) => {
            if (err) {
                reject(new Error('Error while getting meal'));
            } else {
                const meals: Meal[] = result as Meal[];
                resolve(meals);
            }
        });
    });
}

export const getAllMealByDateAndUserIdAndCategoryId = async (date: string, userId: number, categoryId: number): Promise<Meal[]> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`SELECT * FROM meal WHERE date = '${date}' AND userId = ${userId} AND categoryId = ${categoryId}`, (err, result) => {
            if (err) {
                reject(new Error('Error while getting meal'));
            } else {
                const meals: Meal[] = result[0] as Meal[];
                resolve(meals);
            }
        });
    });
}

export const getAllMealUserIdAndCategoryId = async (userId: number, categoryId: number): Promise<Meal[]> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`SELECT * FROM meal WHERE userId = ${userId} AND categoryId = ${categoryId}`, (err, result) => {
            if (err) {
                reject(new Error('Error while getting meal'));
            } else {
                const meals: Meal[] = result[0] as Meal[];
                resolve(meals);
            }
        });
    });
}
