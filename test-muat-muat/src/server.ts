require("dotenv").config()

import express, {Request, Response} from "express"
import createHttpError from "http-errors"
import routes from "./routes"
import cors from "cors"

const app = express()
app.use(express.json(), cors({
  origin: "http://localhost:3000"
}))
routes(app)

// 404 error
// app.use((req: Request, res: Response, next: Function) => {
//   next(createHttpError(404))
// })

app.listen(3031, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3031`)
})