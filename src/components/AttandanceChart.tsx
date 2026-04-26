"use client" 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


// #region Sample data
const data = [
  {
    name: 'Mon',
    Present: 60,
    Absent: 50,
    
  
  },
  {
    name: 'Tue',
    Present: 70,
    Absent: 60,
 
  },
  {
    name: 'Wed',
    Present: 80,
    Absent: 75,
   
  },
  {
    name: 'Thu',
    Present: 60,
    Absent: 70,
    
  },
  {
    name: 'Fri',
    Present: 60,
    Absent: 50,
  
  }
];

const AttandanceChart = () => {
  return (
    <div className='flex  flex-col gap-2 justify-center'>
        <div className='flex justify-between items-center'>
            <span className='text-[16px] font-semibold'>Attandance</span>
            <div className='w-[25px] h-[25px] text-xl mb-5 cursor-pointer' >
                ...
            </div>
              
            

        </div>
        <div className='flex gap-4'>

        </div>
        <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Present" fill="#FAE27C" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
      <Bar dataKey="Absent" fill="#C3EBFA" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />
     
    </BarChart>
    </div>
  )
}

export default AttandanceChart