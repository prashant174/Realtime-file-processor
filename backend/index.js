const express=require('express')
const app=express()
const cors=require('cors')
const { connection } = require('./config/db')
const { fileRouter } = require('./Routes/fileRoutes')
const { startGenerator } = require('./fileGeneratores')
const { start } = require('./socketServer')
const { setupDir } = require('./utils/directorySetup')
require('dotenv').config()

app.use(cors())
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('hello from seerver side a')
});

setupDir()

app.use("/",fileRouter)

startGenerator()


const port=process.env.PORT||8080
const server=app.listen(port,async()=>{
    try {
        await connection
        console.log('mongodb connected')
        console.log(`server ruunning on port ${port}`)
    } catch (error) {
        console.log(error)
    }
})

start(server)