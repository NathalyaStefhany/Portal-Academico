const mongoose = require('../database');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    matriculationNumber: {
        type: Number,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;