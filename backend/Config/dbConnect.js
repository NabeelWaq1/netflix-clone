import mongoose from "mongoose";
import { ENV_VARS } from './envVars.js'

export const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log('Mongodb Connected: ', conn.connection.host);
        
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}