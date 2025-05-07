import mongoose, { mongo } from "mongoose";

const AdminSchema = mongoose.Schema({
    email : {type : String, required: true, unique : true},
    password : {type : String, required : true}
},{ timestamps: true });

const Admin = mongoose.model('Admin',AdminSchema)

export default Admin;