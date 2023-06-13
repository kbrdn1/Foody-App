import express from 'express';
import { isAdmin } from '@middlewares/auth';
import { getFoods, getFood, createFood, updateFood, patchFood, deleteFood, searchFoodsByName } from '@controllers/food';
import { uploadFood } from '@middlewares/uploads';

const router = express.Router();

router.get("/food", getFoods)
router.get("/food/:id", getFood)
router.post("/food", uploadFood, createFood)
router.put("/food/:id", uploadFood, updateFood)
router.patch("/food/:id", patchFood)
router.delete("/food/:id", isAdmin, deleteFood)
router.get("/food/search/:name", searchFoodsByName)

export default router;