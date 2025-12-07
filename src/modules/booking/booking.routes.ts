import { Router } from "express";
import { bookingControlers } from "./booking.controlers";
import auth from "../middleware/authMid";

const router = Router()

router.post('/', bookingControlers.createbooking)
router.get('/', auth('admin', 'customer'), bookingControlers.getbookings)
router.get('/:bookingId',  bookingControlers.getSinglebooking)
router.put('/:bookingId', auth('admin', 'customer'), bookingControlers.updatebooking)
router.delete('/:bookingId', bookingControlers.deletebooking)

export const bookingRoutes = router;