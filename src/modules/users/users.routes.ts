import { Router } from "express";
import { controlers } from "./users.controlers";

const router = Router()

router.post('/', controlers.createUsers)

export const routers = router;