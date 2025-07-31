import { Document, Types } from 'mongoose';

interface IUser extends Document {
	email: string;
	password: string;
	name: string;
	profilePicture?: string;
	bio?: string;
	socialLinks?: {
		discord?: string;
		instagram?: string;
		facebook?: string;
	};
	createToken(): string;
	comparePassword(val: string): Promise<boolean>;
}

export default IUser;