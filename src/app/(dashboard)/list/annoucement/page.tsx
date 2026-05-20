import SearchTable from "@/components/SearchTable"

import Image from "next/image";
import  TableList from "@/components/TableList"
import { role } from "@/lib/data";

// import {teachersData} from  "@/lib/data";

import Link from "next/link";
import Pagination from "@/components/Pagination";

import FormModal from "@/components/FormModal";
import {  Class,Announcement} from "@prisma/client";
import prisma from "@/lib/prisma";
import { useSearchParams } from "next/navigation";



import { pageSize } from "@/lib/settings";
import { count } from "console";



const AnnoucementListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {


     const columns =[
        {
           header :"Title",
           accessor:"title"
        },
        {
             header :"Class",
           accessor:"class",
           className:"hidden md:table-cell"


        },
        {
             header :"Date",
           accessor:"date",
           className:"hidden md:table-cell"


        },
       
       {
         header: "Action",
            accessor:"action"
           
    }

    ]

   

    type AnnouncementType=  Announcement  & {class:Class} 

  

    const renderRow =(item :AnnouncementType) =>(
        <tr key={item.id} className="py-4 even:bg-slate-100 hover:bg-lamaPurple hover:cursor-pointer">
          
            
            <td className="hidden md:table-cell text-sm">{item.title}</td>
            <td className="hidden md:table-cell text-sm">{item.class.name}</td>
            <td className="hidden md:table-cell text-sm">{new Date(item.date).toISOString().split("T")[0]}</td>
           
           
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

  if(key==="search") {
    where.OR = [
      { title: { contains: value, mode: "insensitive" } }
    ];
  
  } else if(key=="classId") {

    where.classId = value;
       
  }
}

  

  

  const  p = page ? parseInt(page) : 1;




const [announcementData,announcementcount]= await prisma.$transaction([
    prisma.announcement.findMany({
        include: {
            class:{select:{name:true}}
        },
        where,
        take: pageSize ,
        skip: (p - 1) * pageSize,
       
    }),
    prisma.announcement.count()
])

const totalPages = Math.ceil(announcementcount / pageSize);






  return (
     <div className='bg-white m-4 p-4'>
        {/* top */}
        <div className="flex items-center justify-between">
            <h1 className="font-semibold text-sm hidden md:flex">All Announcement</h1>
            <div className=" flex flex-col md:flex-row items-center gap-2">
                <SearchTable />

                <div className="flex items-center gap-2">
                    <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/filter.png" alt="logo" width={14} height={14} />

                    </button>
                     <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/sort.png" alt="logo" width={14} height={14} />

                    </button>
                   
                   <FormModal table="annoucement" type="create" />
                
                  

                </div>

            </div>
        </div>
         {/* table */}
         <TableList columns={columns} renderRow={renderRow}  data={announcementData}/>
         {/* bottom */}
         
         <Pagination  totalPages={totalPages} page={p}   />
    </div>
  )
}

export default  AnnoucementListPage 