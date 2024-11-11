import { Router } from "express";
import {
    getAllRoles,
    getRoleById
    // createRole,
    // updateRole,
    // deleteRole
} from "../controllers/roleController";

const router = Router();

router.get("/", getAllRoles);
// router.post("/", createRole); // admin only
router.get("/:id", getRoleById);
// router.put("/:id", updateRole); // admin only
// router.delete("/:id", deleteRole); // admin only

export default router;
