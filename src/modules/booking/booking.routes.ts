import { Router } from "express";
import { bookingControlers } from "./booking.controlers";
import auth from "../middleware/authMid";

const router = Router()

router.post('/', bookingControlers.createbooking)
router.get('/', bookingControlers.getbookings)
router.get('/:bookingId',  bookingControlers.getSinglebooking)
router.put('/:bookingId', auth('admin') ,bookingControlers.updatebooking)
router.delete('/:bookingId', auth('admin') , bookingControlers.deletebooking)

export const bookingRoutes = router;