import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cryptoSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        imgUrl: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Crypto = mongoose.model("Crypto", cryptoSchema);
export default Crypto;