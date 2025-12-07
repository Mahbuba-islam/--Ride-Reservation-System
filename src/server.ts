import express, { Request, Response } from "express"
import initDB from "./configs/db"
import config from "./configs"
import {userRoutes } from "./modules/users/users.routes"
import { authRoutes } from "./modules/auth/auth.route"
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes"
import { bookingRoutes } from "./modules/booking/booking.routes"


const app = express()
const port = config.port 
app.use(express.json())


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

initDB()


app.use('/api/v1/users', userRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/vehicles", vehiclesRoutes)
app.use("/api/v1/bookings", bookingRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


