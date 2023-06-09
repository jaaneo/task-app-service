import dotenv from 'dotenv'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import cors from '@koa/cors'
import router from './routes'
import errorHandler from './middleware/errorHandler'

dotenv.config()

const app = new Koa()

app.use(cors())
app.use(errorHandler)
app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('Connected to MondoDB')
    app.listen(process.env.PORT, () => {
      console.log('server is runnig on port 4500')
    })
  })
  .catch(err => {
    console.log('Error connecting to MondoDB', err)
  })
