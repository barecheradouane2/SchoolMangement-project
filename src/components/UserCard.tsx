import prisma from "@/lib/prisma";
import Image from "next/image";
const UserCard = async({type}:{type:"Students" | "Teachers" | "Parents" | "Admins"}) => {

  let userCount: number = 0;

  switch (type) {
    case "Students":
      userCount = await prisma.student.count();
      break;

    case "Teachers":
      userCount = await prisma.teacher.count();
      break;

    case "Parents":
      userCount = await prisma.parent.count();
      break;

    case "Admins":
      userCount = await prisma.admin.count();
      break;
  }

  console.log(userCount);







  return (
    <div className='flex flex-1 p-4 flex-col gap-2 min-w-[200px] rounded-xl odd:bg-lamaPurple even:bg-lamaYellow'>

        <div className="flex justify-between">
            <div className="bg-white  text-xs flex justify-center text-green-500 px-1 items-center  rounded-full">
                2026/25

            </div>

           
                <Image src="/more.png" alt="" width={20} height={20} />
            

        </div>

        <p className="text-2xl ">{userCount}</p>
        <p className="text-xs text-gray-400 ">{type}</p>

    </div>
  )
}

export default UserCard