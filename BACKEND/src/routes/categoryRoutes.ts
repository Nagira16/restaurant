import { Router } from "express";
import {
    getAllCategories,
    getAllMenusByCategoryId
    // createCategory,
    // updateCategory,
    // deleteCategory
} from "../controllers/categoryController";

const router = Router();

router.get("/", getAllCategories);
// router.post("/", createCategory); // admin only
router.get("/:id", getAllMenusByCategoryId);
// router.put("/:id", updateCategory); // admin only
// router.delete("/:id", deleteCategory); // admin only

export default router;
