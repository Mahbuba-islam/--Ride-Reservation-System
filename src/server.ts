import express, { Request, Response } from "express"
import initDB from "./configs/db"
import config from "./configs"


const app = express()
const port = config.port

app.use(express.json())

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

initDB()




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


