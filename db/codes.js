const mongoose = require("mongoose");

const codes = new mongoose.Schema({
_id: { type: String , required: true },
ownerID: { type: String , required: true },

credits: { type: Number , required: true },

tokens: { type: Array , default: [] },
online_tokens: { type: Array , default: [] },

at: { type: Date , required: true }
});

module.exports = mongoose.model('Codes', codes, 'codes')