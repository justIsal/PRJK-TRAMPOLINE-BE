const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin"],
            default: "admin",
        },
        refreshToken: {
            type: String,
            default: ""
        }
    },
    {
        collection: "admin"
    }
);
const Admin = mongoose.model("admin",AdminSchema);
module.exports = Admin;