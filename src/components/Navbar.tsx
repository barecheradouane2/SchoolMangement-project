import Image from "next/image";
import {  UserButton } from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs/server";

const Navbar =async () => {
  const user=  await currentUser();
  const role = user?.publicMetadata?.role as string;
  return (
    <div className='flex justify-between items-center p-4'>

      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px]
      ring-gray-300
      px-2
      ">
         <Image src="/search.png" alt="logo" width={14} height={14} />
         <input type="text" placeholder=" Search..."  className="bg-transparent w-[200px] p-2 
         outline-none
         "/>

      </div>

      <div className="flex  items-center gap-6 justify-end w-full">
        <div className="bg-white w-7 h-7 flex justify-center items-center rounded-full cursor-pointer">
              <Image src="/message.png" alt="logo" width={20} height={20} />
        </div>
         <div className="bg-white w-7 h-7  relative flex justify-center items-center rounded-full cursor-pointer">
              <Image src="/announcement.png" alt="logo" width={20} height={20} />
              <div className="absolute -top-3 -right-0
              w-5 h-5 flex justify-center items-center bg-purple-500 text-white
              rounded-full text-xs
              ">1</div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John  Doe</span>
          <span className="text-[10px] text-gray-500 text-right">{role}</span>

        </div>

        {/* <Image src="/avatar.png"  alt="avatar" className="rounded-full" width={36} height={36} /> */}

           
              <UserButton />
       







      </div>


    </div>
  )
}

export default Navbar