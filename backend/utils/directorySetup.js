const fs=require('fs')
const path=require('path')

const directories=['Processing','In-progress','Completed','Crashed'];

const setupDir=()=>{
    directories.forEach((ele)=>{
        const dirPath=path.join(__dirname,'..',ele)
        if(!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath,{recursive:true})
        }
    })
}

module.exports={setupDir}