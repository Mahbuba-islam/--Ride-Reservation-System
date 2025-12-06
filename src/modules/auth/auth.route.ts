import { Router } from "express";
import { authControler} from "./auth.controler";

const router = Router()
router.post('/signup', authControler.signup)
router.post('/signin', authControler.signin)


export const authRoutes = router