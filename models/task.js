import mongoose  from "mongoose";

const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    isCompleted:{
     type:Boolean,
     default:false
    },
    user:{
     type:mongoose.Schema.ObjectId,
     ref:"User",
     required:true
    },
    createdAt:{
      type:Date,
      default:Date.now
    }
})

export const Task = mongoose.model("Task",Schema)