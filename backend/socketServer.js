const socketIo=require('socket.io')
const fs=require('fs')
const path=require('path');
const { startProcess } = require('./services/fileServices');

const processingDir = path.join(__dirname, 'Processing');
const inProgressDir = path.join(__dirname, 'In-progress');
const completedDir = path.join(__dirname, 'Completed');
const crashedDir = path.join(__dirname, 'Crashed');

const start=(server)=>{
    const io=socketIo(server,{
        cors:{
            origin:'*',
        }
    })

    io.on('connection',(socket)=>{
        console.log('New client Connected')

        socket.on('disconnected',()=>{
            console.log('client disconnected')
        })
    })

    setInterval(()=>{
        const status={
            processing: fs.readdirSync(processingDir).length,
            inProgress: fs.readdirSync(inProgressDir).length,
            completed: fs.readdirSync(completedDir).length,
            crashed: fs.readdirSync(crashedDir).length,
           
        };
        io.emit('statusUpdate',status)
    },1000)

    startProcess()
}

module.exports={start}