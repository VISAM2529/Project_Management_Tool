const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        require:true
    },
    projectDesc:{
        type:String,
        require:true
    },
    StartDate:{
        type:String,
        require:true
    },
    DeadDate:{
        type:String,
        require:true
    },
    projectMembers:{
        type:Array,
        require:true
    },
    projectTasks:{
        type:Array,
        require:true
    },
    taskDone:{
        type:Array,
        require:true
    },
    admin:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model("Project",ProjectSchema)