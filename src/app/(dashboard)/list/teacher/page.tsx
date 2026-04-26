import SearchTable from "@/components/SearchTable"

import Image from "next/image";

const TeacherListPage = () => {
  return (
    <div className='bg-white m-4 p-4'>
        {/* top */}
        <div className="flex items-center justify-between">
            <h1 className="font-semibold text-sm hidden md:flex">All Teachers</h1>
            <div className=" flex flex-col md:flex-row items-center gap-2">
                <SearchTable />

                <div className="flex items-center gap-2">
                    <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/filter.png" alt="logo" width={14} height={14} />

                    </button>
                     <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/sort.png" alt="logo" width={14} height={14} />

                    </button>
                     <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/plus.png" alt="logo" width={14} height={14} />

                    </button>
               
                  

                </div>

            </div>
        </div>
         {/* table */}
         <div></div>
         {/* bottom */}
           <div></div>
    </div>
  )
}

export default TeacherListPage