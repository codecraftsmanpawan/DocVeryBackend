const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const crypto = require('crypto');

const requestSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    language: {
        type: String,
        enum: ["English", "Hindi"],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ["initiated", "progressive", "completed"],
    },
    requestId: {
        type: String,
        unique: true
    }
}, { timestamps: true });

requestSchema.plugin(AutoIncrement, { inc_field: 'requestIdSeq' });

requestSchema.pre('save', function(next) {
    if (this.isNew) {
        if (!this.requestId) {
            const randomNumber = crypto.randomInt(1000, 10000); // Generate random 4-digit number
            this.requestId = `REQ-ID${randomNumber}`;
        }
    }
    next();
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
