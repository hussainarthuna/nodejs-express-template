const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const adminUserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AdminUser', adminUserSchema);
