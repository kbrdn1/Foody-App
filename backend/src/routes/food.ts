import express from 'express';
import { isAdmin } from '../middlewares/auth';
import { getFoods, getFood, createFood, updateFood, deleteFood } from '../controllers/food';

const router = express.Router();

router.get("/food", getFoods)
router.get("/food/:id", getFood)
router.post("/food", createFood)
router.put("/food/:id", updateFood)
router.delete("/food/:id", isAdmin, deleteFood)

module.exports = router;