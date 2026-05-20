
import SearchTable from "@/components/SearchTable"

import Image from "next/image";
import  TableList from "@/components/TableList"
import { role } from "@/lib/data";

// import {teachersData} from  "@/lib/data";

import Link from "next/link";
import Pagination from "@/components/Pagination";

import FormModal from "@/components/FormModal";
import {Lesson, Class, Teacher ,Subject ,Assignment,Result, Exam, Student} from "@prisma/client";
import prisma from "@/lib/prisma";
import { useSearchParams } from "next/navigation";

import { pageSize } from "@/lib/settings";
import { count } from "console";


const ResultListpage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {


         const columns =[
            {
               header :"Subject Name",
               accessor:"SubjectName"
            },
            {
                 header :"Student",
               accessor:"student",
               className:"hidden md:table-cell"
    
    
            },
            {
                header: "Score",
                accessor:"score",
                className:"hidden md:table-cell"
    
        },
            {
                header: "Teacher",
                accessor:"teacher",
                className:"hidden md:table-cell"
    
        },
            {
                header: "Class",
                accessor:"class",
                className:"hidden md:table-cell"
    
        },{
              header: "Date",
                accessor:"date",
                className:"hidden md:table-cell"
    
        },
        
        
        {
             header: "Action",
                accessor:"action"
               
        }
    
        ]
    
     type ResultType = Result & {
      exam: Exam & {
        lesson: Lesson  & {
            subject:Subject;
            class:Class;
            teacher:Teacher

        };
       
        
      };
       student:Student;
       assignment :Assignment & {
       lesson: Lesson & {
        subject: Subject;
        class: Class;
        teacher: Teacher;
      };
    };
    };

      const renderRow =(item :ResultType) =>(
        <tr key={item.id} className="py-4 even:bg-slate-100 hover:bg-lamaPurple hover:cursor-pointer">
            
            
            <td className="hidden md:table-cell text-sm">{item?.exam?.lesson?.subject?.name || item?.assignment?.lesson?.subject?.name}</td>
            <td className="hidden md:table-cell text-sm">{item.student.name}</td>
            <td className="hidden md:table-cell text-sm">{item.score}</td>
            <td className="hidden md:table-cell text-sm">{item?.exam?.lesson?.teacher?.name || item?.assignment?.lesson?.teacher?.name}</td>
            <td className="hidden md:table-cell text-sm">{item?.exam?.lesson?.class?.name || item?.assignment?.lesson?.class?.name}</td>
           
           <td className="hidden md:table-cell text-sm">
            {item?.exam?.startTime
               ? new Date(item.exam.startTime).toISOString().split("T")[0]
                      : item?.assignment?.dueDate
                   ? new Date(item.assignment.dueDate).toISOString().split("T")[0]
                  : "No Date"}
              </td>
           
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

// should change to handl

for (const [key, value] of Object.entries(queryParams)) {
  if (!value) continue;

  if (key === "classId") {
      
    where.lesson = {
      ...where.lesson,
      classId:parseInt(value) ,
    };
  }

  else if( key==="search") {
    // where[key] = value;
    
    where.OR = [
      { student: { name: { contains: value, mode: "insensitive" } } },
      { exam: { lesson: { subject: { name: { contains: value, mode: "insensitive" } } } } },
    ]

  }
}

  

  

  const  p = page ? parseInt(page) : 1;



const [reusltData, resultCount] = await prisma.$transaction([
  prisma.result.findMany({
    where,
    include: {
      exam: {
        include: {
          lesson :{
            include :{

                teacher:true,
                class:true,
                subject:true,

            }

          }
          
        },
      },
      assignment: {
        include: {
          lesson :{
            include :{

                teacher:true,
                class:true,
                subject:true,

            }

          }
          
        },
      },

      student :true
    },
    take: pageSize,
    skip: (p - 1) * pageSize,
  }),

  prisma.result.count({ where }),
]);

const totalPages = Math.ceil(resultCount / pageSize);




  return (
     <div className='bg-white m-4 p-4'>
        {/* top */}
        <div className="flex items-center justify-between">
            <h1 className="font-semibold text-sm hidden md:flex">All Results</h1>
            <div className=" flex flex-col md:flex-row items-center gap-2">
                <SearchTable />

                <div className="flex items-center gap-2">
                    <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/filter.png" alt="logo" width={14} height={14} />

                    </button>
                     <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/sort.png" alt="logo" width={14} height={14} />

                    </button>
                   
                   <FormModal table="result" type="create" />
                
                  

                </div>

            </div>
        </div>
         {/* table */}
         <TableList columns={columns} renderRow={renderRow}  data={reusltData}/>
         {/* bottom */}
         
         <Pagination  totalPages={totalPages} page={p}   />
    </div>
  )
}

export default ResultListpage