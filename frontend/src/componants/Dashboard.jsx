import React, { useEffect, useState } from 'react'
import socket from '../services/socket'
import {ToastContainer, toast} from 'react-toastify';
// import { Chart as ChartJS, defaults } from "chart.js/auto";
import {Chart as ChartJS} from 'chart.js/auto'
import { Bar, Doughnut, Line } from 'react-chartjs-2';


const Dashboard = () => {
  const [status,setStatus]=useState({
    processing: 0,
    inProgress: 0,
    completed: 0,
    crashed: 0,
  })

  useEffect(()=>{
    socket.on('statusUpdate',(data)=>{
      setStatus(data)
    })

    socket.on('fileStatus',(data)=>{
      setStatus((pre)=>({
        ...pre,
        [data.status.toLowerCase()]:pre[data.status.toLowerCase()]+1
      }))
      if(data.status==='Crashed'){
      toast.error(`File ${data.fileName} has crashed`,{
        position:toast.position.Top_RIGHT
      });
      
      }
    })
      return ()=>{
        socket.off('statusUpdate')
        socket.off('fileStatus')
      }
  },[])

  const chartData = {
    labels: ['Processing', 'In-progress', 'Completed', 'Crashed'],
    datasets: [
      {
        label: 'File Status',
        data: [status.processing, status.inProgress, status.completed, status.crashed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
    <h1>Realtime file processing system</h1>
    <div>
      <h2>Processing  :{status.processing} </h2>
      <h2>In-progress :{status.inProgress}</h2>
      <h2>completed   :{status.completed}</h2>
      <h2>Crashed     :{status.crashed}</h2>
    </div>

   
    <div id='graph'>
    {/* <Line data={chartData} /> */}
      <Bar data={chartData} />
    
    {/* <Doughnut data={chartData} /> */}
    </div>
    {/* <ToastContainer /> */}
    <ToastContainer/>
    </> 
  
  )
}

export default Dashboard
