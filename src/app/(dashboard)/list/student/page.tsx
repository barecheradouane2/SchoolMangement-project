import SearchTable from "@/components/SearchTable"

import Image from "next/image";
import  TableList from "@/components/TableList"


import {studentsData} from  "@/lib/data";
import FormModal from "@/components/FormModal";

import { Student } from "@prisma/client";

import Link from "next/link";
import Pagination from "@/components/Pagination";

import prisma from "@/lib/prisma";
import { pageSize } from "@/lib/settings";
import { role } from "@/lib/util";

const StudentListPage = async ({
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
             header :"Student ID",
           accessor:"studentId",
           className:"hidden md:table-cell"


        },
        {
            header: "Grade",
            accessor:"grade",
            className:"hidden md:table-cell"

    },{
          header: "Phone",
            accessor:"phone",
            className:"hidden md:table-cell"

    },{
          header: "Address",
            accessor:"address",
            className:"hidden md:table-cell"

    },
                   
          ... (role==='admin' ?[{
               header: "Action",
              accessor:"action"
                       
          }] :[])

    ]
    type Student ={
        id:number,
        studentId:number,
         name:string,
        email?:string,
        photo:string,
        phone:string,
        grade:number,
        class:string ,
        address:string,
    }

    type StudentType= Student;



      const renderRow =(item :StudentType) =>(
        <tr key={item.id} className="py-4 even:bg-slate-100 hover:bg-lamaPurple hover:cursor-pointer">
            <td className=" flex items-center gap-4 py-1">
                 <Image src={item.photo} alt="photo"  className=" hidden w-8 h-8 md:flex rounded-full" width={14} height={14} />

                 <div className="flex flex-col " >
                    <p className="font-semibold text-sm ">{item.name}</p>
                    <p className="text-xs">{item.class}</p>

                 </div>
            </td>
            <td className="hidden md:table-cell text-sm">{item.id}</td>
            <td className="hidden md:table-cell text-sm">{item.grade}</td>
            <td className="hidden md:table-cell text-sm">{item.phone}</td>
          
            <td className="hidden md:table-cell text-sm">{item.address}</td>
            <td>{
               ( role=="admin") && (
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                    <button className="rounded-full w-6 h-6 bg-lamaSky flex items-center justify-between p-2">
                        <Image className="
                        " src="/view.png" alt="view" width={18} height={18}/>
                    </button>
                    </Link>
                      <button className="rounded-full w-6 h-6  bg-lamaPurple flex items-center justify-between p-2">
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
  }  else {
    where[key] = value;
  }
}

  

  

  const  p = page ? parseInt(page) : 1;


  const [studentsData,studentcount]= await prisma.$transaction([
    prisma.student.findMany({
       
        where,
        take: pageSize ,
        skip: (p - 1) * pageSize,
       
    }),
    prisma.student.count()
])

const totalPages = Math.ceil(studentcount / pageSize);







  return (
     <div className='bg-white m-4 p-4'>
        {/* top */}
        <div className="flex items-center justify-between">
            <h1 className="font-semibold text-sm hidden md:flex">All Student</h1>
            <div className=" flex flex-col md:flex-row items-center gap-2">
                <SearchTable />

                <div className="flex items-center gap-2">
                    <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/filter.png" alt="logo" width={14} height={14} />

                    </button>
                     <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/sort.png" alt="logo" width={14} height={14} />

                    </button>
                   
                    <FormModal table="student" type="create" />
               
                  

                </div>

            </div>
        </div>
         {/* table */}
         <TableList columns={columns} renderRow={renderRow}  data={studentsData}/>
         {/* bottom */}
         
         <Pagination   totalPages={totalPages} page={p}/>
    </div>
  )
}

export default StudentListPage