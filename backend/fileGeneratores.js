const fs=require('fs');
const path=require('path')
const processingDir=path.join(__dirname,'Processing');

const startGenerator=()=>{
    if(!fs.existsSync(processingDir)){
        fs.mkdirSync(processingDir,{recursive:true})
    }

    setInterval(()=>{
        const fileName=`file_${Date.now()}.txt`;
        fs,fs.writeFileSync(path.join(processingDir,fileName),'samole content');

    },3000)
}

module.exports={startGenerator}