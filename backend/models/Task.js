const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    registro: {
        type: Date,
        default: Date.now
    },
    proyect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyect'
    }

});

module.exports = mongoose.model('Task', TaskSchema);