import mongoose from 'mongoose';

export default async function connectDB(MONGO_URI: string) {
	return mongoose
		.connect(MONGO_URI)
		.then(() => console.log('connected to db'))
		.catch((e) => console.log(e));
}
