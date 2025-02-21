import mongoose from "mongoose";
const { Schema } = mongoose;

const assignmentSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    subject: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    targetGrade: {
        type: Number,
        required: true,
    },
    actualGrade: {
        type: Number,
        default: 0,
    },
    dueDate: {
        type: Date,
        require: true,
    },
    user: {
        type: String,
        require: true,
    },
});

export default assignmentSchema;