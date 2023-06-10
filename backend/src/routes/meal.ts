import Express from "express";
import { isAdmin, isOwnnerOrAdmin } from '@middlewares/auth';
import { getMeal, getMealById, createMeal, updateMeal, deleteMeal, getMealByUserId, getMealByDateAndUserId } from "@controllers/meal";

const router = Express.Router();

router.get("/", isAdmin, getMeal);
router.get("/:id", isAdmin, getMealById);
router.post("/", createMeal);
router.put("/:id", isOwnnerOrAdmin, updateMeal);
router.delete("/:id", isOwnnerOrAdmin, deleteMeal);
router.get("/user/:userId", isOwnnerOrAdmin, getMealByUserId);
router.get("/date/:date/user/:userId", isOwnnerOrAdmin, getMealByDateAndUserId);

export default router;