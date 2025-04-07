const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('posts', PostSchema);