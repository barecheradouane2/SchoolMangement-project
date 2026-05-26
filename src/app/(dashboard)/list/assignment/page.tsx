
import SearchTable from "@/components/SearchTable"

import Image from "next/image";
import  TableList from "@/components/TableList"


// import {teachersData} from  "@/lib/data";

import Link from "next/link";
import Pagination from "@/components/Pagination";

import FormModal from "@/components/FormModal";
 import {Lesson, Class, Teacher ,Subject ,Assignment} from "@prisma/client";


import prisma from "@/lib/prisma";
import { useSearchParams } from "next/navigation";

import { pageSize } from "@/lib/settings";
import { count } from "console";
import { currentUserId, role } from "@/lib/util";

const AssignmentLisst = async ({
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
                 header :"Class",
               accessor:"class",
               className:"hidden md:table-cell"
    
    
            },
            {
                header: "Teacher",
                accessor:"teacher",
                className:"hidden md:table-cell"
    
        },{
              header: "Due Date",
                accessor:"duedate",
                className:"hidden md:table-cell"
    
        },
       
     ... ((role==='admin' || role==='teacher')  ?[{
         header: "Action",
            accessor:"action"
           
       }] :[])
    
        ]
    
     type AssignmentType = Assignment & {
      lesson: Lesson & {
        subject: Subject;
        class: Class;
        teacher: Teacher;
      };
    };

      const renderRow =(item :AssignmentType) =>(
        <tr key={item.id} className="py-4 even:bg-slate-100 hover:bg-lamaPurple hover:cursor-pointer">
            
            
            <td className="hidden md:table-cell text-sm">{item.lesson.subject.name}</td>
            <td className="hidden md:table-cell text-sm">{item.lesson.class.name}</td>
            <td className="hidden md:table-cell text-sm">{item.lesson.teacher.name}</td>
            <td className="hidden md:table-cell text-sm"> {new Date(item.dueDate).toISOString().split("T")[0]}</td>
           
            <td>{
               ( role=="admin" || role=="teacher") && (
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

  if (key === "teacherId") {
    where.lesson = {
      ...where.lesson,
      teacherId: value,
    };
  }

  else if (key === "subjectId") {
    where.lesson = {
      ...where.lesson,
      subjectId: parseInt(value),
    };
  }

  else if (key === "classId") {
    where.lesson = {
      ...where.lesson,
      classId: parseInt(value),
    };
  }

  else if (key === "lessonId") {
    where.lessonId = parseInt(value);
  }

  else {
    where[key] = value;
  }
}

// chekc role teacher can only see his own assignment 

switch (role) {
  case "teacher":
     where.lesson = { teacherId: currentUserId };
    break;
  case "student":
     where.lesson = {
    class: {
      students: {
        some: {
          id: currentUserId!,
        },
      },
    },
  };
     

    break;
    case "parent" :

    where.lesson = {
    class: {
      students: {
        some: {
          parentId: currentUserId!,
        },
      },
    },
  };




    break;
  // admin can see all
}


  

  

  const  p = page ? parseInt(page) : 1;



const [assignmentData, assignmentCount] = await prisma.$transaction([
  prisma.assignment.findMany({
    where,
    include: {
      lesson: {
        include: {
          subject: true,
          teacher: true,
          class: true,
        },
      },
    },
    take: pageSize,
    skip: (p - 1) * pageSize,
  }),

  prisma.exam.count({ where }),
]);

const totalPages = Math.ceil(assignmentCount / pageSize);



  return (
    <div className='bg-white m-4 p-4'>
        {/* top */}
        <div className="flex items-center justify-between">
            <h1 className="font-semibold text-sm hidden md:flex">All Assignments</h1>
            <div className=" flex flex-col md:flex-row items-center gap-2">
                <SearchTable />

                <div className="flex items-center gap-2">
                    <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/filter.png" alt="logo" width={14} height={14} />

                    </button>
                     <button className="bg-lamaYellow p-2 rounded-full flex items-center justify-between">
                        <Image src="/sort.png" alt="logo" width={14} height={14} />

                    </button>
                   
                   <FormModal table="assignment" type="create" />
                
                  

                </div>

            </div>
        </div>
         {/* table */}
         <TableList columns={columns} renderRow={renderRow}  data={assignmentData}/>
         {/* bottom */}
         
         <Pagination  totalPages={totalPages} page={p}   />
    </div>
  )
}

export default AssignmentLisst