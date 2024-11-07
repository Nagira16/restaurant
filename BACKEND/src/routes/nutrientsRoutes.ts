import { Router } from "express";
import {
    getAllNutrients,
    getNutrientById,
    createNutrient,
    updateNutrient,
    deleteNutrient
} from "../controllers/nutrientsController";

const router = Router();

router.get("/", getAllNutrients);
router.get("/:id", getNutrientById);
router.post("/", createNutrient);
router.put("/:id", updateNutrient);
router.delete("/:id", deleteNutrient);

export default router;
