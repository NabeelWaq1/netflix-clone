import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image: {
        type: String,
        default: ''
    },
    searchHistory: {
		type: Array,
		default: [],
	},
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;