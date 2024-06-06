const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        noWa: {
            type: String,
            required: true,
        },
        tanggalLahir: {
            type: String,
            required: true
        },
        tipePengguna: {
            type: String,
            enum: ['Reguler','Member'],
            default: 'Reguler'
        },
        jenisKeanggotaan: {
            type: String,
            enum: ['','Gold','Silver','Platinum'],
            default: ''
        },
        idAnggota: {
            type: String,
            default: ''
        }
    },
    {
        collection: "Users"
    }
);
const Admin = mongoose.model("Users",AdminSchema);
module.exports = Admin;