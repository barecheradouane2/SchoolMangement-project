"use client" 
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Event =[
  {
    id:1,
    title:"Lorem ipsum dolor",
    time:"12:00pm-2:00pm",
    descripition:"Lorem ipsum dolor sit amet, consdrutctur adpricing ait. "

},
 {
    id:2,
    title:"Lorem ipsum dolor",
    time:"12:00pm-2:00pm",
    descripition:"Lorem ipsum dolor sit amet, consdrutctur adpricing ait. "

},
   {
    id:3,
    title:"Lorem ipsum dolor",
    time:"12:00pm-2:00pm",
    descripition:"Lorem ipsum dolor sit amet, consdrutctur adpricing ait. "

}


]


const Calender = () => {
     const [value, onChange] = useState<Value>(new Date());
  return (
   <div className='bg-white p-4  flex flex-col gap-4 rounded-md' >
      <div className='flex justify-center items-center w-full'>
       <Calendar locale="en-US" onChange={onChange} value={value} />
      </div>
      <div className=' flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span className='font-semibold'>Events</span>
           <span className='font-semibold cursor-pointer'>...</span>

        </div>
        <div className='flex flex-col gap-2'>

        {
          Event.map((d)=>(
            <div className='flex flex-col border-2 p-4 border-gray-400 odd:border-lamaPurple even:border-lamaSky' key={d.id}>
              <div className='flex justify-between'>
                <span  className=''>{d.title}</span>
                <span className='text-xs text-gray-400'>{d.time}</span>
              </div>
              <div className='text-xs text-gray-500'>
                {d.descripition}
              </div>

            </div>

          ))
        }
        </div>

      </div>
    </div>
  )
}

export default Calender