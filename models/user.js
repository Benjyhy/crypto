import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true,
            default: "EUR"
        },
        cryptos: {
            type: Array,
            required: true,
            default: ["BTC"]
        },
        keywords: {
            type: Array,
            required: true,
            default: ["Bitcoin"]
        },
    },
    { timestamps: true }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
export default User;
