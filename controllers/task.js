import ErrorHandler from "../middlewares/err.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user: req.user._id });
    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const getMyTask = async (req, res,next) => {
    try {
        const userid = req.user._id;
    const tasks =  await Task.find({user:userid})

    res.status(200).json({
        success:true,
        tasks,
    })
    } catch (error) {
        next(error)
    }
};



export const UpdateTask = async (req, res,next) => {
   try {
    const {id} = req.params;
    const tasks = await Task.findById(id)

    if(!tasks) return next(new ErrorHandler("Task not found", 404))

        tasks.isCompleted = !tasks.isCompleted;
        await tasks.save()
        res.status(200).json({
            success:true,
            message:"Task Updated"
        })
   } catch (error) {
    next(error)
   }
};




export const DeleteTask = async (req, res,next) => {
   try {
    const {id} = req.params;

    const tasks = await Task.findById(id)

    if(!tasks) return next(new ErrorHandler("Task not found", 404))
        await tasks.deleteOne()

    res.status(200).json({
        success:true,
        message:"Task Deleted"
    })
   } catch (error) {
    next(error)
   }
};
