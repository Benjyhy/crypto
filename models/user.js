import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        cryptos: {
            type: Array,
            required: true,
        },
        keywords: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
