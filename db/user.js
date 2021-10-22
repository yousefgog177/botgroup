const mongoose = require("mongoose");

const user = new mongoose.Schema({
_id: { type: String , required: true },
access_token: { type: String , required: true },
auth: { type: String , required: true },

email: { type: String , required: false },
});

module.exports = mongoose.model('Users', user, 'users')