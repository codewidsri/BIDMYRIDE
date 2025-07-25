import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import ConnectDatabase from "./database/ConnectDatabase.js";
import Rider from "./routes/RiderRoute.js";
import Driver from "./routes/DriverRoute.js";
import fs from 'fs';

dotenv.config();

// const sslOptions = {
//     key: fs.readFileSync("./key.pem"),
//     cert: fs.readFileSync("./cert.pem"),
// };

const app = express();
// const server = https.createServer(sslOptions, app);
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.VITE_FRONTEND, "https://localhost:5173"],
        credentials: true,
    },
});

let onlineriders = {}, onlinedrivers = {};

io.on("connection", (socket) => {

    socket.on("rider:join", ({ riderid }) => {
        onlineriders[riderid] = socket.id;
        console.log(riderid + " rider was connected")
    });

    socket.on("driver:join", ({ driverid }) => {
        onlinedrivers[driverid] = socket.id;
        console.log(driverid + " driver was connected")
    });

    socket.on("rider:sendfare", ({ riderid, ridername, fare, showdrivers, pickup, dropoff, distance, pickupCoords, }) => {
        showdrivers.forEach((driver) => {
            const driversocket = onlinedrivers[driver._id];
            if (driversocket) {
                io.to(driversocket).emit("driver:receivefare", { riderid, ridername, fare, pickup, dropoff, distance, pickupCoords, });
            }
        });
    });

    socket.on("rider:confirmride", ({ rideid, riderid, driverid, fare }) => {
        const driversocket = onlinedrivers[driverid];
        if (driversocket) {
            io.to(driversocket).emit("driver:confirmedride", { rideid, riderid, fare })
        }
    });

    socket.on("driver:sendfare", ({ riderid, driverid, fare }) => {
        const ridersocket = onlineriders[riderid];
        if (ridersocket) {
            io.to(ridersocket).emit("rider:receivefare", { driverid, fare });
        }
    });

    socket.on("driver:acceptedfare", ({ driverid, riderid, fare }) => {
        const ridersocket = onlineriders[riderid];
        if (ridersocket) {
            io.to(ridersocket).emit("rider:acceptedfare", { driverid, fare });
        }
    });

    socket.on("driver:ridestarted", ({ riderid }) => {
        const ridersocket = onlineriders[riderid];
        if (ridersocket) {
            io.to(ridersocket).emit("rider:ridestarted")
        }
    })

    socket.on("rider:riderlivelocation", ({ ridercoords, driverid }) => {
        const driversocket = onlinedrivers[driverid];
        if (driversocket) {
            io.to(driversocket).emit("driver:riderlivelocation", { ridercoords })
        }
    })

    socket.on("driver:driverlivelocation", ({ drivercoords, riderid }) => {
        const ridersocket = onlineriders[riderid];
        if (ridersocket) {
            io.to(ridersocket).emit("rider:driverlivelocation", { drivercoords })
        }
    })

    socket.on("driver:ridefinished", ({ riderid }) => {
        const ridersocket = onlineriders[riderid]
        if (ridersocket) {
            io.to(ridersocket).emit("rider:driverridefinished")
        }
    })

    socket.on("rider:ridefinished",({driverid})=>{
        const driversocket = onlinedrivers[driverid]
        if(driversocket){
            io.to(driversocket).emit("driver:riderridefinshed")
        }
    })

    socket.on("disconnect", () => {
        for (let [id, sid] of Object.entries(onlinedrivers)) {
            if (sid === socket.id) delete onlinedrivers[id];
        }
        for (let [id, sid] of Object.entries(onlineriders)) {
            if (sid === socket.id) delete onlineriders[id];
        }
        console.log(`Socket ${socket.id} disconnected`);
    });
});

app.use(
    cors({
        origin: [process.env.VITE_FRONTEND, "https://localhost:5173"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

ConnectDatabase();

app.use("/api/rider", Rider);
app.use("/api/driver", Driver);

// server.listen(process.env.PORT, "0.0.0.0", () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});