
import prisma from "@/lib/prisma";
import CountRedicalBarChart from "./CountRedicalBarChart";
import { UserSex } from "@prisma/client";



const CountContainerRedicalBarChart = async () => {


    const studentsBySex = await prisma.student.groupBy({
      by: ['sex'],
       _count: {
          id: true,
        },
    });

     let boys :number= studentsBySex.find((s) => s.sex === UserSex.MALE)?._count.id || 0;
     let girls :number= studentsBySex.find((s) => s.sex === UserSex.FEMALE)?._count.id || 0;


  return (
     <div className='w-full md:w-1/3  rounded-2xl flex  flex-col justify-center bg-white p-4'>
         <div className='flex justify-between items-center'>
            <span className='text-xs font-bold'>Students</span>
            <div className='w-[25px] h-[25px] text-xl mb-5 cursor-pointer' >
                ...
            </div>
              
            

        </div>

        <CountRedicalBarChart boys={boys} girls={girls} />


         {/* bottom */}
       <div className='flex items-center justify-center gap-4'>
        <div className='flex flex-col gap-1'>
          <div className='bg-lamaSky w-[20px] h-[20px] rounded-full'></div>
          <p className=''>{boys}</p>
          <p className='text-gray-500'>Men ({Math.floor(boys / (boys + girls)) * 100} %)</p>

        </div>

         <div   className='flex flex-col gap-1'>
          <div className='bg-lamaYellow w-[20px] h-[20px] rounded-full'></div>
          <p className=''>{girls}</p>
          <p className='text-gray-500 text-x'>Girl ({Math.floor(girls / (boys + girls)) * 100} %)</p>

        </div>

       </div>
        
        </div>
  )
}

export default CountContainerRedicalBarChart