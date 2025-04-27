import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    priority: {
        type: String,
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
});

const sessionSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    target: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        require: true,
    },
    tasks: {
        type: [taskSchema],
    },
    users: {
        type: [String],
        require: true,
    },
});

export default model("Session", sessionSchema);