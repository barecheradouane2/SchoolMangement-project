"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// #region Sample data
const data = [
  {
    name: 'Jan',
    Income: 4000,
    Outcome: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    Income: 3000,
    Outcome: 1398,
    amt: 2210,
  },
  {
    name: 'Mars',
    Income: 2000,
    Outcome: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    Income: 2780,
    Outcome: 3908,
    amt: 2000,
  },
  {
    name: 'Mai',
    Income: 1890,
    Outcome: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    Income: 2390,
    Outcome: 3800,
    amt: 2500,
  },
  {
    name: 'jul',
    Income: 3490,
    Outcome: 4300,
    amt: 2100,
  },
  ,
  {
    name: 'Aug',
    Income: 2599,
    Outcome: 4300,
    amt: 2100,
  },{
     name: 'Sept',
    Income: 2599,
    Outcome: 4300,
    amt: 2100,

  },{
     name: 'Oct',
    Income: 1399,
    Outcome: 2100,
    amt: 2100,

  },{
     name: 'Nov',
    Income: 2399,
    Outcome: 4100,
    amt: 2100,

  },{
     name: 'Des',
    Income: 2399,
    Outcome: 4100,
    amt: 2100,

  }
];


const FinanceChart = () => {
  return (
       <div className='flex   flex-col gap-2 justify-center overflow-hidden'>
          <div className='flex justify-between items-center'>
            <span className='text-[16px] font-semibold'>Finance</span>
            <div className='w-[25px] h-[25px] text-xl mb-5 cursor-pointer' >
                ...
            </div>
              
            

        </div>
      <LineChart
      style={{ width: '100%', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
      <XAxis dataKey="name" stroke="#000" />
      <YAxis width="auto" stroke="#000" />
      <Tooltip
        cursor={{
          stroke: 'var(--color-border-2)',
        }}
        contentStyle={{
          backgroundColor: 'var(--color-surface-raised)',
          borderColor: 'var(--color-border-2)',
        }}
      />
      <Legend />
      <Line
        type="monotone"
          dataKey="Income"
        
        stroke="#C3EBFA"
        dot={{
          fill: 'var(--color-surface-base)',
        }}
        activeDot={{ r: 8, stroke: 'var(--color-surface-base)' }}
      />
      <Line
        type="monotone"
        dataKey="Outcome"
      
        stroke="#CFCEFF"
        dot={{
          fill: 'var(--color-surface-base)',
        }}
        activeDot={{ stroke: 'var(--color-surface-base)' }}
      />
     
    </LineChart>
    </div>
  )
}

export default FinanceChart