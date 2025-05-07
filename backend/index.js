import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectDatabase from './database/ConnectDatabase.js'

dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())

ConnectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server is listening to the port ${process.env.PORT}`)
})