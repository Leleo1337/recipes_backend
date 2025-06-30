import './types/express'
import env from "./config/env";
import app from "./app";
import connectDB from "./db/connect";

const PORT = env.PORT
const MONGO_URI = env.MONGO_URI || ''

async function start() {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()