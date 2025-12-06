import { Router } from "express";
import { vehiclesControlers } from "./vehicles.controlers";
import auth from "../middleware/authMid";

const router = Router()

router.post('/',  vehiclesControlers.createVehicles)
router.get('/', vehiclesControlers.getVehicles)
router.get('/:vehicleId',  vehiclesControlers.getSingleVehicles)
router.put('/:vehicleId', auth('admin') ,vehiclesControlers.updateVehicles)
router.delete('/:vehicleId', auth('admin') , vehiclesControlers.deleteVehicles)

export const vehiclesRoutes = router;