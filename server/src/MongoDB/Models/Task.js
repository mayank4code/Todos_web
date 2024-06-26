const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName:{
        type : String ,
    },
    status: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }

);

module.exports = mongoose.model("Task", TaskSchema);