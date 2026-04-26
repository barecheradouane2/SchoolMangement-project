"use client" 

const AnnouncementData =[
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

const Announcement = () => {
  return (
    <div className='bg-white p-4  flex flex-col gap-4 rounded-md'>
         <div className='flex justify-between items-center'>
          <span className='font-semibold'>Announcement</span>
           <span className='text-xs cursor-pointer'>View All</span>

        </div>

         <div className='flex flex-col gap-2'>

        {
          AnnouncementData.map((d)=>(
            <div className='flex flex-col gap-2 border-2 p-4  even:bg-lamaPurple odd:bg-lamaSky' key={d.id}>
              <div className='flex justify-between'>
                <span  className='text-black'>{d.title}</span>
                <span className='text-[8px] text-gray-400 px-1 flex justify-center items-center  rounded-md bg-white'>{d.time}</span>
              </div>
              <div className='text-xs text-gray-500'>
                {d.descripition}
              </div>

            </div>

          ))
        }
        </div>

    </div>
  )
}

export default Announcement