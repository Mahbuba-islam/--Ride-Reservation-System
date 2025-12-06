import { Router } from "express";
import { controlers } from "./users.controlers";
import auth from "../middleware/authMid";

const router = Router()


router.get('/',   auth('admin', 'customer'), controlers.getUsers)
router.put('/:userId', controlers.updateUser)
router.delete('/:userId',   controlers.deleteUser)

export const userRoutes = router;