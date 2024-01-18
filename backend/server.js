const nodemon = require("nodemon")
const express = require("express")
const mongoose = require("mongoose");
const UserSchema = require("./database/Users")
const ProjectSchema = require("./database/Project")
const TodoTaskSchema=require("./database/TodoTaskDb")
const connectDB =require("./database/db")

connectDB()
const port = 5000

const app = express();



app.use(express.json({ extended: false }));
const cors = require("cors");
app.use(cors());

let session_username = ""
app.post("/userCreate",async(req,res)=>{
  
    const {fname} = req.body
        const {lname}=req.body
        const {email} = req.body
        const {mobile} = req.body
        const {username} =req.body
        const {password}=req.body
        const{Role}=req.body
    try {
        await UserSchema.findOne({email:email}).then((user)=>{
            if(user){
                res.json("Exist")
            }
            else if(!user){
                const NewUserSchema = new UserSchema({
                    firstName:fname,
                    lastName:lname,
                    email:email,
                    mobileno:mobile,
                    username:username,
                    password:password,
                    Role:Role
                })
                NewUserSchema.save()
                res.json("Created")
            }
            else{
                res.json("Something Went Wrong")
            }
        })

    } catch (error) {
        console.log(error)
    }
})

app.post("/userLogin",async(req,res)=>{
    const {email} =req.body
    const {username} = req.body
    const {password} = req.body

    try {
        await UserSchema.findOne({email:email}).then((user)=>{
            if(!user){
                res.json("notFound")
            }
            else if(user.password===password){
                res.json("Success")
                session_username=username
            }
            else if(!user.password===password){
                res.json("Invalid")
            }
            else{
                res.json("Wrong")
            }
        })
    } catch (error) {
        console.log(error)
    }

})
app.post("/projectDetail",async(req,res)=>{
    const {admin}=req.body
    const {projectName}=req.body
    const {projectDesc}=req.body
    const {StartDate}=req.body
    const {DeadDate}=req.body
    const {projectMembers}=req.body
    const {projectTasks}=req.body

    try {
        const newProjectSchema = new ProjectSchema({
            projectName:projectName,
            projectDesc:projectDesc,
            StartDate:StartDate,
            DeadDate:DeadDate,
            projectMembers:projectMembers,
            projectTasks:projectTasks,
            admin:admin
        })
        await newProjectSchema.save()
    } catch (error) {
        console.log(error)
    }
})

app.post("/addTodoTask",async(req,res)=>{
    const {username}=req.body
    const {task}=req.body

    try {
        const newTodoTaks=new TodoTaskSchema({
            username:username,
            task:task
        })
        await newTodoTaks.save()
        res.json("Done")
    } catch (error) {
        console.log(error)
        res.json("Error")
    }

})
app.delete("/deleteTodoTaskData/:task",async(req,res)=>{
    let task=req.params.task
    task = task.replace(":","")
    console.log(task)
    try {
        await TodoTaskSchema.findOneAndDelete({task:task})
          res.json("Done")
    } catch (error) {
        console.log(error)
    }
})
app.get("/TodoTasks",async(req,res)=>{
    const TodoTaskData=await TodoTaskSchema.find({username:session_username})
    res.json(TodoTaskData)
})
app.get("/projectDetail",async(req,res)=>{
    const projectData=await ProjectSchema.find({$or: [
        { projectMembers: session_username },
        {admin:session_username}
      ]})
    res.json(projectData)
})
app.get("/project/:projectName",async (req,res)=>{
    let name = req.params.projectName
    name = name.replace(":","")
    const projectInfo=await ProjectSchema.find({projectName:name})
    res.json(projectInfo)
    console.log(projectInfo)
})
app.get("/userDetail",async(req,res)=>{
    const userData =await UserSchema.find({username:session_username})
    res.json(userData)
})
app.get("/users",async(req,res)=>{
    const Users = await UserSchema.find({})
    res.json(Users)
})
app.post("/doneTask/:projectName/:task",async(req,res)=>{
    let task = req.params.task
    task = task.replace(":","")
    let name = req.params.projectName
    name = name.replace(":","")
    console.log(task)
    try {
        const project = await ProjectSchema.findOne({projectName:name})
        if(!project){
            res.json("NotFound")
        }
        else{
            const taskIndex = project.projectTasks.indexOf(task);

            if (taskIndex !== -1) {
                // Use splice to remove the task at the specified index
                project.projectTasks.splice(taskIndex, 1);
                project.taskDone.push(task);

                // Save the changes
                await project.save();
            }
        }
    } catch (error) {
        console.log(error)
    }

})
app.listen(port,()=>{
    console.log(`Successfully Connected at port : ${port}`)
})