import { Router } from "express";
import {
    // getAllNutrients,
    getNutrientByMenuId
    // createNutrient,
    // updateNutrient,
    // deleteNutrient
} from "../controllers/nutrientsController";

const router = Router();

// router.get("/", getAllNutrients); // admin only
// router.post("/", createNutrient); // admin only
router.get("/:id", getNutrientByMenuId);
// router.put("/:id", updateNutrient); // admin only
// router.delete("/:id", deleteNutrient); // admin only

export default router;
