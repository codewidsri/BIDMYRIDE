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
        origin: 'https://effective-orbit-wr75rj799gxpf5vwr-5173.app.github.dev',
        credentials: true
    }
})

let onlineriders = {}, onlinedrivers = {};

io.on('connection', (socket) => {

    socket.on('rider:join', ({ riderid, ridername, rideremail }) => {
        onlineriders[riderid] = socket.id;
        console.log(ridername + " rider was joined")
        console.log(onlineriders)
    })

    socket.on('driver:join', ({ driverid, drivername, driveremail }) => {
        onlinedrivers[driverid] = socket.id;
        console.log(drivername + " driver was joined")
        console.log(onlinedrivers)
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

app.use(cors({ origin: 'https://effective-orbit-wr75rj799gxpf5vwr-5173.app.github.dev', credentials: true }))
app.use(express.json())
app.use(cookieParser())

ConnectDatabase();

app.use('/api/rider', Rider)
app.use('/api/driver', Driver)

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})