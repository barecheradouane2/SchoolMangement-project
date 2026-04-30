import Announcement from "@/components/Announcement"
import BigCalender from "@/components/BigCalender"
import PerformanceChart from "@/components/PerformanceChart"
import Image from "next/image"
import "react-big-calendar/lib/css/react-big-calendar.css"

const SingleTeacherPage
 = () => {
  return (
    <div className='flex-1 p-4 flex flex-col xl:flex-row  gap-4'>
        {/* left */}
        <div className="flex flex-col gap-4  w-full xl:w-2/3">
            <div className="     flex gap-4  flex-col xl:flex-row ">
        {/* header */}

        <div className=" bg-lamaSky flex-1 p-4  flex gap-4 ">
            <Image src="/avatar.png" alt="logo" className="rounded-full" width={100} height={100} />
               
               <div className="flex flex-col gap-2">
                <p>Dean Guerrero</p>
                <p className="text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
                <div className="flex flex-wrap gap-4 justify-between">
                    <div className="flex  gap-2">
                        <Image src="/blood.png" alt="blood"  width={7} height={7} />
                        <span className="text-xs">A+</span>

                    </div>
                         <div className="flex gap-2">
                        <Image src="/calendar.png" alt="calendar"  width={10} height={10} />
                        <span className="text-xs">January 2025</span>

                    </div>
                         <div className="flex gap-2">
                        <Image src="/mail.png" alt="mail"  width={10} height={10} />
                        <span className="text-xs">bareche6@gmail.com</span>

                    </div>
                         <div className="flex gap-2">
                        <Image src="/phone.png" alt="blood" width={10} height={10} />
                        <span className="text-xs">+658917236</span>

                    </div>

                </div>
               </div>

        </div>

        <div className="flex-1 flex gap-4 flex-col md:flex-row flex-wrap " >
            <div className="flex  gap-4 bg-white p-4  md:w-[45%] flex-1  ">
                <div>
                    <Image src="/singleAttendance.png" alt="blood"  width={18} height={18} />
                </div>
                <div className="flex flex-col gap-1">
                    <h1>90%</h1>
                    <h1>Attendance</h1>

                </div>

            </div>
            <div className="flex gap-4 bg-white p-4 md:w-[45%] flex-1 ">
                <div>
                    <Image src="/singleBranch.png" alt="blood"  width={18} height={18} />
                </div>
                <div className="flex flex-col gap-1">
                    <h1>2</h1>
                    <h1>Branches</h1>

                </div>

            </div>

               <div className="flex gap-4 bg-white p-4 md:w-[45%] flex-1 ">
                <div>
                    <Image src="/singleLesson.png" alt="blood" width={18} height={18} />
                </div>
                <div className="flex flex-col gap-1">
                    <h1>6</h1>
                    <h1>Lessons</h1>

                </div>

            </div>

               <div className="flex gap-4 bg-white p-4 md:w-[45%] flex-1 ">
                <div>
                    <Image src="/singleClass.png" alt="blood"  width={18} height={18} />
                </div>
                <div className="flex flex-col gap-1">
                    <h1>6%</h1>
                    <h1>Classes</h1>

                </div>

            </div>
           
        </div>


            </div>
             <div className="w-full flex-1 bg-white p-4">
               <BigCalender />
             </div>
       
        </div>

        {/* right*/}
        <div className="w-full xl:w-1/3 flex flex-col gap-4  ">
           <div className="flex flex-col gap-2 p-4 bg-white">
            <div>Shortcut</div>
            <div className="flex gap-2 flex-wrap">
                <div className="px-4 py-2 text-xs odd:bg-lamaSky even:bg-lamaPurple">Teachers Classess</div>
                <div className="px-4 py-2 text-xs odd:bg-lamaSky even:bg-lamaPurple">Teachers Students</div>
                <div className="px-4 py-2 text-xs odd:bg-lamaSky even:bg-lamaPurple">Teachers Lessons</div>
                <div className="px-4 py-2 text-xs odd:bg-lamaSky even:bg-lamaPurple">Teachers Exams</div>
                <div className="px-4 py-2 text-xs odd:bg-lamaSky even:bg-lamaPurple">Teachers Assignements</div>
                

            </div>

           </div>

         <PerformanceChart/>

         <Announcement />


        </div>
    </div>
  )
}

export default SingleTeacherPage
