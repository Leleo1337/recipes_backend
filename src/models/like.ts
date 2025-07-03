import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
	{
		likedBy: {
			type: mongoose.Types.ObjectId,
            ref: 'User',
			required: true,
		},
		recipeID: {
			type: mongoose.Types.ObjectId,
            ref: 'Recipe',
			required: true,
		},
	},
	{ timestamps: true, versionKey: false },
);

const Like = mongoose.model('Likes', likeSchema)

export default Like