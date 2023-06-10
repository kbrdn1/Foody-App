import express from 'express';
import { isAdmin } from '@middlewares/auth';
import { getFoods, getFood, createFood, updateFood, patchFood, deleteFood } from '@controllers/food';
import { uploadFood } from '@middlewares/uploads';

const router = express.Router();

router.get("/", getFoods)
router.get("/:id", getFood)
router.post("/", uploadFood, createFood)
router.put("/:id", uploadFood, updateFood)
router.patch("/:id", patchFood)
router.delete("/:id", isAdmin, deleteFood)

export default router;