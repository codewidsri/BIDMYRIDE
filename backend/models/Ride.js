import mongoose from "mongoose";

const RideSchema = new mongoose.Schema({
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: "Rider", required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  pickupCoords: { type: { type: String, default: 'Point' }, coordinates: { type: [Number], required: true }},
  dropoffCoords: { type: { type: String, default: 'Point' }, coordinates: { type: [Number], required: true }},
  distance: { type: Number, required: true },
  fare: { type: Number, required: true },
  vehicletype: { type: String, enum: ['bike', 'auto', 'car'], required: true },
  vehiclenumber: { type: String, required: true },
  status: { type: String, enum: ['confirmed', 'started', 'completed', 'cancelled'], default: 'confirmed'},
  createdAt: { type: Date, default: Date.now }
});

RideSchema.index({ pickupCoords: "2dsphere" });
RideSchema.index({ dropoffCoords: "2dsphere" });

const Rides = mongoose.model("Rides",RideSchema);

export default Rides;