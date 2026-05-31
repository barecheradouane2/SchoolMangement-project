"use client"

import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import Image from "next/image";




// #endregion
const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};





const CountRedicalBarChart = ({ boys, girls }: { boys: number; girls: number }) => {

  // #region Sample data
const data = [
  {
    name: 'total',
    count: boys + girls,
   
    fill: 'white',
  },
  {
    name: 'Girls',
    count: girls,
  
    fill: '#FAE27C',
    
  },
  {
    name: 'Men',
    count: boys,

    
    fill: '#C3EBFA',
  }
];



 
  return (
    
       
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
       
      

      
    
  )
}

export default CountRedicalBarChart


