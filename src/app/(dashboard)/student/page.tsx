import Calender from '@/components/Calender'
import Announcement from "@/components/Announcement"
import  BigCalender from "@/components/BigCalender"
import "react-big-calendar/lib/css/react-big-calendar.css"


const StudentPage
 = () => {
  return (
    <div className=' flex flex-col xl:flex-row p-4 gap-4'>
      {/* left */}
      <div className= ' w-full xl:w-2/3 bg-white  p-4  h-[100vh]'>

            <BigCalender />
      </div>
      {/* right */}
      <div className='w-full flex flex-col gap-4 xl:w-1/3'>
          <Calender />
         <Announcement />

      </div>
      
    </div>
  )
}

export default StudentPage
