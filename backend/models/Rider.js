import mongoose from 'mongoose'

const RiderSchema = new mongoose.Schema({
    name : {type: String , required : true},
    email : {type: String, required : true, unique : true},
    phone : {type: String, required : true, unique : true},
    password : {type : String, required : true},
    address : {type : String, required : true},
    location : {type : {type: String, default : 'Point'},coordinates: [Number]}
},{timestamps: true});

RiderSchema.index({location : '2dsphere'})

const Riders = mongoose.model('Riders',RiderSchema);

export default Riders;