const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const list = mongoose.model('todotask', listSchema);

module.exports = list;