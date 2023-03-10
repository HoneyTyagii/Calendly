const Mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const scheduleSchema = new Mongoose.Schema({
    user:{
        type: ObjectId,
        ref: "User",
    },
    day:{
        type: Data,
        required: true
    },
    dayStart: {
        type: Date,
        required: true
    },
    dayEnd: {
        type: Date,
        required: true
    },
    eventDuration: {
        type: Date,
        required: true
    },
    events: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ]
})

module.exports = Mongoose.model("Schedule", scheduleSchema);