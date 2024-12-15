import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByClerkId
} from "../controllers/userController";

const router = Router();

// router.get("/", getAllUsers); // admin only
router.post("/", createUser);
router.get("/clerk/:id", getUserByClerkId);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
