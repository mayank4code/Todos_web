const router = require('express').Router();
const Task = require("../MongoDB/Models/Task");

router.get("/getAllTasks" , async ( req ,res )=>{
    const allTasks = await Task.find() ;
    try {
        res.status(200).json({success:true , message:"All Tasks are fetched" , allTasks });
    } catch (error) {
        res.status(500).json({success: false , message: error.message});
    }
});

router.post("/addTask" , async (req , res)=>{
    try {
        const newTask = await Task.create(req.body) ; 
        res.status(200).json({success : true , message : "Task Added Successfully" , newTask });
    } catch (error) {
        res.status(500).json({success:false , message : error.message });
    }

});

router.delete("/deleteTask/:id" , async(req ,res)=>{
    try {
        const taskId = req.params.id ;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({success:true , message : "Task Deleted Succssfully" , taskId });
    } catch (error) {
        res.status(500).json({success:false , message : error.message });
    }
});

module.exports = router;