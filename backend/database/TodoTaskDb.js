const mongoose = require("mongoose")

const TodoTaskSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    task:{
        type:Array,
        require:true
    }
})


module.exports = mongoose.model("TodoTaskDb",TodoTaskSchema)