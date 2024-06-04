const { File } = require("../Models/fileModel");


const getStatus=async(req,res)=>{
    try {
        const processing = await File.countDocuments({ status: 'Processing' });
        const inProgress = await File.countDocuments({ status: 'In-progress' });
        const completed = await File.countDocuments({ status: 'Completed' });
        const crashed = await File.countDocuments({ status: 'Crashed' });

        res.json({ processing, inProgress, completed, crashed });
    } catch (error) {
        res.status(500).send({msg:"something wrong in controller"})
    }
}

module.exports={
    getStatus
}