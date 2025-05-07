import mongoose from "mongoose";

async function ConnectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('✅ MongoDB Atlas connected');
    } catch (error) {
        console.error('❌ Connection error:', err.message);
        process.exit(1);
    }
}

export default ConnectDatabase;