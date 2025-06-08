import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    rideid: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    riderid: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider', required: true },
    driverid: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    role: { type: String, enum: ['rider', 'driver'], required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, default: null },
    date: { type: Date, default: Date.now }
})

RatingSchema.index({ rideid: 1, role: 1 }, { unique: true })

const Ratings = mongoose.model('Ratings', RatingSchema)

export default Ratings;