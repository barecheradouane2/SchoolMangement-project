"use client"

import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import Image from "next/image";


// #region Sample data
const data = [
  {
    name: 'total',
    count: 1800,
   
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 1123,
  
    fill: '#FAE27C',
    
  },
  {
    name: 'Men',
    count: 1123,

    
    fill: '#C3EBFA',
  }
];

// #endregion
const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};





const CountRedicalBarChart = () => {
 
  return (
    <div className='w-full md:w-1/3  rounded-2xl flex  flex-col justify-center bg-white p-4'>
        <div className='flex justify-between items-center'>
            <span className='text-xs font-bold'>Students</span>
            <div className='w-[25px] h-[25px] text-xl mb-5 cursor-pointer' >
                ...
            </div>
              
            

        </div>
        <div className='flex  w-full h-[75%] items-center justify-center'>
          <RadialBarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', aspectRatio: 1.618 }}
      responsive
      cx="40%"
      barSize={32}
      data={data}
      className='flex items-center justify-center '
    >
      <RadialBar label={{ position: 'insideStart', }} background dataKey="count" />
      
      
 
        </RadialBarChart>
       </div>
       
       {/* bottom */}
       <div className='flex items-center justify-center gap-4'>
        <div className='flex flex-col gap-1'>
          <div className='bg-lamaSky w-[20px] h-[20px] rounded-full'></div>
          <p className=''>1123</p>
          <p className='text-gray-500'>Men ({Math.floor(1123 / 1800)} %)</p>

        </div>

         <div   className='flex flex-col gap-1'>
          <div className='bg-lamaYellow w-[20px] h-[20px] rounded-full'></div>
          <p className=''>1123</p>
          <p className='text-gray-500 text-x'>Girl ({Math.floor(1123 / 1800)} %)</p>

        </div>

       </div>

      
    </div>
  )
}

export default CountRedicalBarChart


