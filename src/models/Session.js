import mongoose from "mongoose";
const { Schema } = mongoose;

const targetSchema = new Schema({
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
    },
});

const sessionSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
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
    targets: {
        type: [targetSchema],
    },
    user: {
        type: String,
        require: true,
    },
});

export default sessionSchema;