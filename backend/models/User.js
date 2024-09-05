// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        phoneNo: {
            type: String,
            required: true,
            unique: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,  // Store the URL or path of the uploaded image
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

// Use export default for ESM
export default User;
