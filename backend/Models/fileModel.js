const mongoose=require('mongoose')

const fileSchema=new mongoose.Schema({
    fileName:String,
    status:{type:String,
        enum:['Processing','In-progress','Completed','Crashed'], default:'Processing'
    },
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
});

const File=mongoose.model('File',fileSchema)

module.exports={File}