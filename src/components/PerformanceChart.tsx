"use client"
import Image from 'next/image';
import { Pie, PieChart } from 'recharts';


const PerformanceChart = () => {
    // #region Sample data
const data = [
  { name: 'Group A', value: 400 ,fill: '#C3EBFA' },
  { name: 'Group B', value: 100,fill: '#FAE27C' }
  
];
  return (
    <div className=' bg-white p-4 flex flex-col  relative'>
        
        <div className=' flex justify-between items-center'>
            <h1 className='font-bold '>Performance</h1>
            <button>
                <Image src="/moredark.png" alt='more' width={17} height={17}/>
            </button>
            

        </div>
        <div className='flex flex-col justify-center items-center gap-6'>
            <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx="50%"
        cy="100%"
        outerRadius="120%"
        innerRadius={60}
        
      />
     
    </PieChart>
    <h2 className='font-semibold'>1 st Semster-2 st Semster</h2> 
        </div>
        <div className='flex flex-col gap-1 items-center absolute top-[60%] right-[40%]'>
            <h1 className=' text-2xl'>9.2</h1>
            <h3 className='text-xs'>Of 10 max LTS</h3>
        </div>
     
    
    </div>
  )
}

export default PerformanceChart