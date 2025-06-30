import { Document } from 'mongoose';

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	createToken(): string;
	comparePassword(val: string): Promise<boolean>;
}

export default IUser;
