import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ConnectDatabase from './database/ConnectDatabase.js'
import Rider from './routes/RiderRoute.js'
import Driver from './routes/DriverRoute.js'

dotenv.config()

const app = express()

app.use(cors({ origin: 'https://effective-orbit-wr75rj799gxpf5vwr-5173.app.github.dev', credentials: true }))
app.use(express.json())
app.use(cookieParser())

ConnectDatabase();

app.use('/api/rider', Rider)
app.use('/api/driver', Driver)

app.listen(process.env.PORT, () => {
    console.log(`server is listening to the port ${process.env.PORT}`)
})