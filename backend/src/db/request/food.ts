import Food from '@models/food';
import connectDb from '@db/connect'

// Get all foods
export const getAllFoods = async (): Promise<Food[]> => {
    return await new Promise((resolve, reject) => {
        connectDb.query("SELECT * FROM food", (err, result) => {
            if (err) {
                reject(new Error('Error while getting foods'));
            } else {
                const foods: Food[] = result as Food[];
                resolve(foods);
            }
        });
    });
}

// Get a food
export const getOneFood = async (id: number): Promise<Food> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`SELECT * FROM food WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(new Error('Error while getting food'));
            } else {
                const food: Food = result[0] as Food;
                resolve(food);
            }
        });
    });
}

// Create a food
export const addFood = async (food: Food): Promise<Food> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`INSERT INTO food (name, img, calorie, lipid, carbohydrate, protein) VALUES ('${food.name}', '${food.img}', '${food.calorie}', '${food.lipid}', '${food.carbohydrate}', '${food.protein}')`, (err, result) => {
            if (err) {
                reject(new Error('Error while creating food'));
            } else {
                food.id = result.insertId;
                resolve(food);
            }
        });
    });
}

// Edit a food
export const editFood = async (id: number, food: Food): Promise<Food> => { 
    return await new Promise((resolve, reject) => {
        connectDb.query(`UPDATE food SET name = '${food.name}', img = '${food.img}', calorie = '${food.calorie}', lipid = '${food.lipid}', carbohydrate = '${food.carbohydrate}', protein = '${food.protein}' WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(new Error('Error while editing food'));
            } else {
                food.id = id;
                resolve(food);
            }
        });
    });
}

// Patch a food
export const patchOneFood = async (id: number, food: Food): Promise<Food> => {
    return await new Promise((resolve, reject) => {
        const sql = `UPDATE food SET name= '${food.name}', calorie= '${food.calorie}', lipid= '${food.lipid}', carbohydrate= '${food.carbohydrate}', protein= '${food.protein}' WHERE id = ${id}`;
        connectDb.query(sql, (err, result) => {
            if (err) {
                reject(new Error('Error while patching food'));
            } else {
                food.id = id;
                resolve(food);
            }
        });
    });
}

// Delete a food
export const dropFood = async (id: number): Promise<Food> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`DELETE FROM food WHERE id = ${id}`, (err, result) => {
            if (err) {
                reject(new Error('Error while deleting food'));
            } else {
                const food: Food = result[0] as Food;
                resolve(food);
            }
        });
    });
}

// Search foods
export const searchFoods = async (search: string): Promise<Food[]> => {
    return await new Promise((resolve, reject) => {
        connectDb.query(`SELECT * FROM food WHERE name LIKE '%${search}%'`, (err, result) => {
            if (err) {
                reject(new Error('Error while searching foods'));
            } else {
                const foods: Food[] = result as Food[];
                resolve(foods);
            }
        });
    });
}