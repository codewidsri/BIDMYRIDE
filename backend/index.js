import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from "http";
import { Server } from "socket.io";
import ConnectDatabase from './database/ConnectDatabase.js';
import Rider from './routes/RiderRoute.js';
import Driver from './routes/DriverRoute.js';

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'https://shiny-meme-jj57jw5449w9c95g-5173.app.github.dev',
        credentials: true
    }
})

let onlineriders = {}, onlinedrivers = {};

io.on('connection', (socket) => {

    socket.on('rider:join', ({ riderid }) => {
        onlineriders[riderid] = socket.id;
    })

    socket.on('driver:join', ({ driverid }) => {
        onlinedrivers[driverid] = socket.id;
    })

    socket.on('rider:sendfare', ({ riderid, ridername, fare, showdrivers, pickup, dropoff, distance, pickupCoords }) => {
        showdrivers.forEach((driver) => {
            const driversocket = onlinedrivers[driver._id]
            if (driversocket) {
                io.to(driversocket).emit('driver:receivefare', { riderid, ridername, fare, pickup, dropoff, distance, pickupCoords })
            }
        })
    })

    socket.on('disconnect', () => {
        for (let [id, sid] of Object.entries(onlinedrivers)) {
            if (sid === socket.id) delete onlinedrivers[id]
        }
        for (let [id, sid] of Object.entries(onlineriders)) {
            if (sid === socket.id) delete onlineriders[id]
        }
        console.log(`Socket ${socket.id} disconnected`)
    })

})
// https://shiny-meme-jj57jw5449w9c95g-5173.app.github.dev/
app.use(cors({ origin: 'https://shiny-meme-jj57jw5449w9c95g-5173.app.github.dev', credentials: true }))
app.use(express.json())
app.use(cookieParser())

ConnectDatabase();

app.use('/api/rider', Rider)
app.use('/api/driver', Driver)

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})