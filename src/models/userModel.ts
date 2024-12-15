import mongoose, {Model, Document} from "mongoose";
import { userProps } from "../types";

interface t extends Document {
    user: userProps
};


const userModel = new mongoose.Schema({
    userName: {
        type: String,
        require: [true, 'Please provide a username'],
        unique: [true, 'This username is not avalible']
    },
    email: {
        type: String,
        require: [true, 'Please provide an email'],
        unique: [true, 'There is an  account with his email']
    },
    passWord: {
        type: String,
        require: [true, 'Please provide a password']
    },
    roles: {
        type: [String],
        default: ['personal'],
    },    
    isVerified: {
        type: Boolean,
        default: false
    },
    loginDBToken: String,
    verificationToken: String,
    verificationTokenExpiryData: Number,
    forgetPassWordToken: String,
    forgetPassWordTokenExpiryData: Number,
    avatar: String,
    dateOfBirth: String,
    displayDateOfBirth: Boolean,
    displayEmails: [String],
    displayPhoneNumbers: [String],
    website: String,
    profession: [String],
    country: String,
    sex: String,
    bio: {
        type: String,
        max: [50, "Words have exceded 50 words"] 
    },
    likes: [String],
});

const Users: Model<t['user']> = mongoose.models.userstodo || mongoose.model<Model<t['user']>>('userstodo', userModel);

export default  Users;