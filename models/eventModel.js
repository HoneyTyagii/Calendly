const Mongoose = require("mongoose");

const eventSchema = new Mongoose.Schema({
    menteeEmail: {
        type: String,
        required: true
    },
    mentorId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    schedule: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Schedule"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    day:{
        type: Data,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
})

module.exports = Mongoose.model("Event", eventSchema);