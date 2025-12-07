import { Router } from "express";
import { bookingControlers } from "./booking.controlers";
import auth from "../middleware/authMid";

const router = Router()

router.post('/',  auth('admin', 'customer'), bookingControlers.createbooking)
router.get('/', auth('admin', 'customer'), bookingControlers.getbookings)
router.put('/:bookingId', auth('admin', 'customer'), bookingControlers.updatebooking)

export const bookingRoutes = router;