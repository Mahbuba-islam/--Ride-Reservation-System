import express, { Request, Response } from "express"
import initDB from "./configs/db"
import config from "./configs"
import { routers } from "./modules/users/users.routes"


const app = express()
const port = config.port
app.use(express.json())


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

initDB()


app.use('/api/v1/auth/signup', routers)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


