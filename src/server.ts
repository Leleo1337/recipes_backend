import './types/express'
import env from "./config/env";
import app from "./app";
import connectDB from "./db/connect";

const PORT = env.PORT
const MONGO_URI = env.MONGO_URI || ''

async function start() {
    try {
        await connectDB(MONGO_URI);
    } catch (error) {
        console.log(error)
    }
}

start()