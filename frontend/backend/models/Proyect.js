const mongoose = require('mongoose');

const ProyectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    registro: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Proyect', ProyectSchema);