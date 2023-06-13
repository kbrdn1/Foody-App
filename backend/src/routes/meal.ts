import Express from "express";
import { isAdmin, isOwnnerOrAdmin } from '@middlewares/auth';
import { getMeal, getMealById, createMeal, updateMeal, deleteMeal, getMealByUserId, getMealByDateAndUserId, getMealByDateAndUserIdAndCategoryId, getMealByUserIdAndCategoryId } from "@controllers/meal";

const router = Express.Router();

router.get("/meal", isAdmin, getMeal);
router.get("/meal/:id", isAdmin, getMealById);
router.post("/meal", createMeal);
router.put("/meal/:id", isOwnnerOrAdmin, updateMeal);
router.delete("/meal/:id", isOwnnerOrAdmin, deleteMeal);
router.get("/meal/user/:userId", isOwnnerOrAdmin, getMealByUserId);
router.get("/meal/date/:date/user/:userId", isOwnnerOrAdmin, getMealByDateAndUserId);
router.get("/meal/date/:date/user/:userId/category/:categoryId", isOwnnerOrAdmin, getMealByDateAndUserIdAndCategoryId);
router.get("/meal/user/:userId/category/:categoryId", isOwnnerOrAdmin, getMealByUserIdAndCategoryId);

export default router;