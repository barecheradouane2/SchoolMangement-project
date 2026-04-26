import React from 'react'
import UserCard from '@/components/UserCard'

import CountRedicalBarChart from '@/components/CountRedicalBarChart'
import AttandanceChart from '@/components/AttandanceChart'
import FinanceChart from '@/components/FinanceChart'
import Calender from '@/components/Calender'
import Announcement from "@/components/Announcement"


export default function AdminPage() {
  return (
    <div className='p-4 flex flex-col md:flex-row  gap-4 justify-between '>
      {/* left */}
      <div className=' flex flex-col gap-6 w-full  md:w-2/3'>
      {/* cards */}
      <div className='flex  flex-wrap gap-2 justify-between'>
        <UserCard type="Students" />
        <UserCard type="Teachers" />
        <UserCard type="Parents" />
        <UserCard type="Staffs" />

      </div>

      {/* count chart and attendance */}
      <div className='flex   gap-4 flex-col md:flex-row'>

        {/* count chart */}
        <CountRedicalBarChart />

       

         {/* attendance chart */}
         <div className=' w-full md:w-2/3 bg-white p-4 rounded-md'> 
          <AttandanceChart />
         </div>
          

      </div>

      {/* Finance chart */}

       <div className=' w-full  bg-white p-4 rounded-md'> 
          <FinanceChart />
         </div>

        

      </div>
       {/* right */}
      <div className='w-full flex flex-col gap-4 md:w-1/3'>
    
        <Calender />
         <Announcement />
      
         
      </div>
    </div>
  )
}


