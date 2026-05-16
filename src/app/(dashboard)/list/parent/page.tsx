import SearchTable from "@/components/SearchTable"

import Image from "next/image";
import  TableList from "@/components/TableList"
import { role } from "@/lib/data";

import {parentsData} from  "@/lib/data";

import { Parent ,Student} from "@prisma/client";

import Link from "next/link";
import Pagination from "@/components/Pagination";

import prisma from "@/lib/prisma";
import { pageSize } from "@/lib/settings";

const ParentListPage = async ({
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
                 header :"Student Names",
               accessor:"StudentNames",
               className:"hidden md:table-cell"
    
    
            },
            {
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
        type ParentType = Parent  & {students:Student []};
          const renderRow =(item :ParentType) =>(
            <tr key={item.id} className="py-4 even:bg-slate-100 hover:bg-lamaPurple hover:cursor-pointer">
                <td className=" flex items-center gap-4 py-1">
                    
    
                     <div className="flex flex-col " >
                        <p className="font-semibold text-sm ">{item.name}</p>
                        <p className="text-xs">{item.email}</p>
    
                     </div>
                </td>
                <td className="hidden md:table-cell text-sm">{item.students.map(j => j.name).join(",")}</td>
                
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
  
  }if (key === "studentid") {
    where.students = {
      some: { id:  parseInt(value) }
    };
  } else {
    where[key] = value;
  }
}

  

  

  const  p = page ? parseInt(page) : 1;




const [parentsData,parentcount]= await prisma.$transaction([
    prisma.parent.findMany({
        include: {
            students: true,
        },
        where,
        take: pageSize ,
        skip: (p - 1) * pageSize,
       
    }),
    prisma.parent.count()
])

const totalPages = Math.ceil(parentcount / pageSize);







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
                     <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/plus.png" alt="logo" width={14} height={14} />

                    </button>
               
                  

                </div>

            </div>
        </div>
         {/* table */}
         <TableList columns={columns} renderRow={renderRow}  data={parentsData}/>
         {/* bottom */}
         
         <Pagination  totalPages={totalPages} page={p} />
    </div>
  )
}

export default ParentListPage