import { app } from "./app"
import { connectDb } from "./db/connectionMongo"
import dotenv from 'dotenv'

dotenv.config({
  path : './.env'
})

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => console.log(`Server running on http://localhost:${process.env.PORT}`))
  })
  .catch((error) => {
    console.log(error);
  })