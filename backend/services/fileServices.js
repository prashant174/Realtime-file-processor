const fs=require('fs')
const path=require('path');
const { File } = require('../Models/fileModel');


const processingDir = path.join(__dirname, '..', 'Processing');
const inProgressDir = path.join(__dirname, '..', 'In-progress');
const completedDir = path.join(__dirname, '..', 'Completed');
const crashedDir = path.join(__dirname, '..', 'Crashed');

const moveFile=(source,destination)=>{
    fs.renameSync(source,destination)
};


const startProcess=()=>{
    setInterval(async()=>{
        const files=fs.readdirSync(processingDir);
        if(files.length>0){
            const fileName=files[0]
            const source=path.join(processingDir,fileName);
            const dest=path.join(inProgressDir,fileName);
            moveFile(source,dest);

            const file=new File({fileName,status:'In-progress'});
            await file.save()

            const processingTime=Math.floor(Math.random()*6000)+1000;

            setTimeout(async()=>{
                const inProgressFile=path.join(inProgressDir,fileName);
                if(fs.existsSync(inProgressFile)){
                    const targetDir=processingTime<=5000?completedDir:crashedDir;
                    moveFile(inProgressFile,path.join(targetDir,fileName));

                    file.status=targetDir===completedDir?'Completed':'Crashed';
                    file.updatedAt=Date.now()
                    await file.save()
                }
            },processingTime)
        }
    },3000)
};

module.exports={startProcess}