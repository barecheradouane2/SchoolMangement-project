import SearchTable from "@/components/SearchTable"

import Image from "next/image";
import  TableList from "@/components/TableList"
import { role } from "@/lib/data";

// import {teachersData} from  "@/lib/data";

import Link from "next/link";
import Pagination from "@/components/Pagination";

import FormModal from "@/components/FormModal";
import { Class, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma";
import { useSearchParams } from "next/navigation";



import { pageSize } from "@/lib/settings";
import { count } from "console";





const TeacherListPage =  async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

    const columns =[
        {
           header :"Info",
           accessor:"info"
        },
        {
             header :"Teacher ID",
           accessor:"teacherId",
           className:"hidden md:table-cell"


        },
        {
            header: "Subject",
            accessor:"subject",
            className:"hidden md:table-cell"

    },{
          header: "Classes",
            accessor:"classes",
            className:"hidden md:table-cell"

    },{
          header: "Phone",
            accessor:"phone",
            className:"hidden md:table-cell"

    },{
          header: "Address",
            accessor:"address",
            className:"hidden md:table-cell"

    },{
         header: "Action",
            accessor:"action"
           
    }

    ]

   

    type TeacherType=  Teacher  & {subjects:Subject []} & {classes :Class []}

  

    const renderRow =(item :TeacherType) =>(
        <tr key={item.id} className="py-4 even:bg-slate-100 hover:bg-lamaPurple hover:cursor-pointer">
            <td className=" flex items-center gap-4 py-1">
                 <Image src={item.img || "/noAvatar.png"} alt="photo"  className=" hidden w-8 h-8 md:flex rounded-full" width={14} height={14} />

                 <div className="flex flex-col " >
                    <p className="font-semibold text-sm ">{item.name}</p>
                    <p className="text-xs">{item.email}</p>

                 </div>
            </td>
            
            <td className="hidden md:table-cell text-sm">{item.username}</td>
            <td className="hidden md:table-cell text-sm">{item.subjects.map(j => j.name).join(",")}</td>
            <td className="hidden md:table-cell text-sm">{item.classes.map(c => c.name).join(", ")}</td>
            <td className="hidden md:table-cell text-sm">{item.phone}</td>
            <td className="hidden md:table-cell text-sm">{item.address}</td>
            <td>{
               ( role=="admin") && (
                <div className="flex items-center gap-2">
                    <Link href={`/list/teacher/${item.id}`}>
                    <button className="rounded-full w-7 h-7 bg-lamaSky flex items-center justify-between p-2">
                        <Image className="
                        " src="/update.png" alt="view" width={18} height={18}/>
                    </button>
                    </Link>
                      <button className="rounded-full w-7 h-7  bg-lamaPurple flex items-center justify-between p-2 ">
                        <Image src="/delete.png" alt="delete"width={18} height={18}/>
                    </button>

                </div>
               )
                }</td>

        </tr>
)




  const {page,...queryParams} =searchParams;



 const where: any = {};

for (const [key, value] of Object.entries(queryParams)) {
  if (!value) continue;

  if(key==="name") {
    where.OR = [
      { name: { contains: value, mode: "insensitive" } },
      { email: { contains: value, mode: "insensitive" } },
      { username: { contains: value, mode: "insensitive" } },
    ];
  
  }else if (key === "classid") {
    where.classes = {
      some: { id:  parseInt(value) }
    };
  } else if (key === "subjectid") {
    where.subjects = {
      some: { id:  parseInt(value) }
    };
  } else {
    where[key] = value;
  }
}

  

  

  const  p = page ? parseInt(page) : 1;




const [teachersData,teachercount]= await prisma.$transaction([
    prisma.teacher.findMany({
        include: {
            subjects: true,
            classes: true,
        },
        where,
        take: pageSize ,
        skip: (p - 1) * pageSize,
       
    }),
    prisma.teacher.count()
])

const totalPages = Math.ceil(teachercount / pageSize);

console.log("hello world what the problem")












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
                   
                   <FormModal table="teacher" type="create" />
                
                  

                </div>

            </div>
        </div>
         {/* table */}
         <TableList columns={columns} renderRow={renderRow}  data={teachersData}/>
         {/* bottom */}
         
         <Pagination  totalPages={totalPages} page={p}   />
    </div>
  )
}

export default TeacherListPage