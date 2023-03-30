import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        notes: {
            type: String,
        },
        userId: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;